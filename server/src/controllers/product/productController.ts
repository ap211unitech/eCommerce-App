import { AuthID } from "../../types/Auth";
import {
  CreateProductPayload,
  DeleteProductPayload,
  EditProductPayload,
} from "../../types/Product";

import {
  NO_SUCH_CATEGORY_EXISTS,
  PRODUCT_ALREADY_EXISTS,
  PRODUCT_NAME_TOO_SHORT,
  PRODUCT_DESCRIPTION_TOO_SHORT,
  INVALID_SPECIFICATIONS,
  INVALID_FILTERS,
  PRODUCT_AVALIABLE_QUANTITY,
  INVALID_PRODUCT_VARIATION,
  NO_SUCH_PRODUCT_EXISTS,
  UNAUTHORIZED_REQUEST,
  NO_SUCH_USER_EXISTS,
  CAN_NOT_FEATURE_PRODUCT,
  CAN_NOT_EDIT_PRODUCT,
} from "../../constants/error";
import { APOLLO_ERROR } from "../../constants/errorTypes";

import { slugify } from "../../utils/slugify";
import { errorHandler } from "../../utils/errorHandler";

import { createProductValidation } from "../../validators/product";

import Category from "../../models/Category";
import Product from "../../models/Product";
import User from "../../models/User";
import { getResponse, isValidJSON } from "./helpers";

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

  const productExists = await Product.findById(productId);
  const user = await User.findById(userId);

  // Check if product exists for given productId
  if (!productExists) {
    return errorHandler({ ...NO_SUCH_PRODUCT_EXISTS, type: APOLLO_ERROR });
  }

  if (!user) {
    return errorHandler({ ...NO_SUCH_USER_EXISTS, type: APOLLO_ERROR });
  }

  //  Only admin can feature product
  if (user.role !== "admin" && isFeatured) {
    return errorHandler({ ...CAN_NOT_FEATURE_PRODUCT, type: APOLLO_ERROR });
  }

  // Vendor can only edit thier product
  if (user.role === "vendor") {
    if (productExists.createdBy.toString() !== user._id.toString()) {
      return errorHandler({ ...UNAUTHORIZED_REQUEST, type: APOLLO_ERROR });
    }
  }

  // Create Slug
  const productSlug = slugify([name, description, specifications]);

  //  Valid CategoryId
  const categoryExists = await Category.findById(categoryId);
  if (!categoryExists) {
    return errorHandler({ ...NO_SUCH_CATEGORY_EXISTS, type: APOLLO_ERROR });
  }

  // Unique Slug
  const productExistsBySlug = await Product.findOne({ slug: productSlug });
  if (productExistsBySlug) {
    return errorHandler({ ...PRODUCT_ALREADY_EXISTS, type: APOLLO_ERROR });
  }

  // Minimum 5 words in product name & description
  if (name.trim().split(" ").length <= 5) {
    return errorHandler({ ...PRODUCT_NAME_TOO_SHORT, type: APOLLO_ERROR });
  }

  if (description.trim().split(" ").length <= 5) {
    return errorHandler({
      ...PRODUCT_DESCRIPTION_TOO_SHORT,
      type: APOLLO_ERROR,
    });
  }

  // Valid JSON in specification & filters
  if (!isValidJSON(filters)) {
    return errorHandler({ ...INVALID_FILTERS, type: APOLLO_ERROR });
  }
  if (!isValidJSON(specifications)) {
    return errorHandler({ ...INVALID_SPECIFICATIONS, type: APOLLO_ERROR });
  }

  // Avaliable quantity must be greater than 0
  if (avaliableQuantity <= 0) {
    return errorHandler({ ...PRODUCT_AVALIABLE_QUANTITY, type: APOLLO_ERROR });
  }

  // Check if avaliable variations array has valid productId
  let isProductVariationError = false;
  for (let index = 0; index < variations.length; index++) {
    const productId = variations[index];
    const productVariationExists = await Product.findById(productId);
    if (!productVariationExists) {
      isProductVariationError = true;
      break;
    }
  }

  if (isProductVariationError) {
    return errorHandler({
      ...INVALID_PRODUCT_VARIATION,
      type: APOLLO_ERROR,
    });
  }

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
