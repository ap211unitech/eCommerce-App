import { AuthID } from "../../types/Auth";
import {
  CreateProductPayload,
  DeleteProductPayload,
  EditProductPayload,
} from "../../types/Product";

import {
  NO_SUCH_PRODUCT_EXISTS,
  UNAUTHORIZED_REQUEST,
  NO_SUCH_USER_EXISTS,
  CAN_NOT_EDIT_PRODUCT,
} from "../../constants/error";
import { APOLLO_ERROR } from "../../constants/errorTypes";

import { slugify } from "../../utils/slugify";
import { errorHandler } from "../../utils/errorHandler";

import {
  createProductValidation,
  editProductValidation,
} from "../../validators/product";

import Product from "../../models/Product";
import User from "../../models/User";
import { getResponse } from "./helpers";

// @Desc    Get all products
// @Access  Public
export const getAllProducts = async () => {
  const products = await Product.find({}).populate(
    "categoryId createdBy updatedBy"
  );
  return products.map((product) => getResponse(product));
};

// @Desc    Add product through form data
// @Access  Private (Only vendor/admin can create product)
export const createProduct = async (payload: CreateProductPayload & AuthID) => {
  const {
    categoryId,
    name,
    description,
    specifications,
    filters,
    gallery,
    variations,
    discount,
    price,
    avaliableQuantity,
    userId,
  } = payload;

  // Validate Data
  await createProductValidation(payload);

  // Create Slug
  const productSlug = slugify([name, description, specifications]);

  const product = await new Product({
    categoryId,
    name,
    slug: productSlug,
    description,
    gallery,
    variations: variations ?? [],
    specifications,
    filters,
    price,
    avaliableQuantity,
    discount,
    createdBy: userId,
    updatedBy: userId,
  }).populate("categoryId createdBy updatedBy");

  product["variations"].unshift(product._id);

  // Save product
  await product.save();

  return getResponse(product);
};

// @Desc    Edit product through form data
// @Access  Private (Admin can edit any product/Vendors can edit thier product only)
export const editProduct = async (payload: EditProductPayload & AuthID) => {
  const {
    productId,
    categoryId,
    name,
    description,
    specifications,
    filters,
    gallery,
    variations,
    discount,
    price,
    avaliableQuantity,
    userId,
    isArchived,
    isFeatured,
  } = payload;

  // Validate Data
  await editProductValidation(payload);

  // Create Slug
  const productSlug = slugify([name, description, specifications]);

  const updatedProductPayload = {
    categoryId,
    name,
    slug: productSlug,
    description,
    gallery,
    variations: variations.includes(productId)
      ? variations
      : [productId, ...variations],
    specifications,
    filters,
    price,
    avaliableQuantity,
    discount,
    updatedBy: userId,
    isFeatured,
    isArchived,
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: { ...updatedProductPayload } },
    { new: true }
  ).populate("categoryId createdBy updatedBy");

  if (!updatedProduct) {
    return errorHandler({
      ...CAN_NOT_EDIT_PRODUCT,
      type: APOLLO_ERROR,
    });
  }

  return getResponse(updatedProduct);
};

// @Desc    Delete product & it's review through given productId
// @Access  Private (Admin can delete any product/Vendors can delete thier product only)
export const deleteProduct = async (payload: DeleteProductPayload & AuthID) => {
  const { productId, userId } = payload;
  const user = await User.findById(userId);
  const product = await Product.findById(productId);

  if (!user) {
    return errorHandler({ ...NO_SUCH_USER_EXISTS, type: APOLLO_ERROR });
  }

  if (!product) {
    return errorHandler({ ...NO_SUCH_PRODUCT_EXISTS, type: APOLLO_ERROR });
  }

  // If user is vendor, check if product created by that user
  if (user.role === "vendor") {
    if (product.createdBy.toString() !== user._id.toString()) {
      return errorHandler({ ...UNAUTHORIZED_REQUEST, type: APOLLO_ERROR });
    }
  }

  // TODO: Delete all it's reviews

  await Product.findByIdAndDelete(productId);
  return { message: "Product deleted successfully" };
};
