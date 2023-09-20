import { AuthID } from "../../types/Auth";
import { CreateProductPayload } from "../../types/Product";

import {
  NO_SUCH_CATEGORY_EXISTS,
  PRODUCT_ALREADY_EXISTS,
  PRODUCT_NAME_TOO_SHORT,
  PRODUCT_DESCRIPTION_TOO_SHORT,
  INVALID_SPECIFICATIONS,
  INVALID_FILTERS,
  PRODUCT_AVALIABLE_QUANTITY,
  INVALID_PRODUCT_VARIATION,
} from "../../constants/error";
import { APOLLO_ERROR } from "../../constants/errorTypes";

import { slugify } from "../../utils/slugify";
import { errorHandler } from "../../utils/errorHandler";

import Category from "../../models/Category";
import Product from "../../models/Product";
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

  // Create Slug
  const productSlug = slugify([name, description, specifications]);

  //  Valid CategoryId
  const categoryExists = await Category.findById(categoryId);
  if (!categoryExists) {
    return errorHandler({ ...NO_SUCH_CATEGORY_EXISTS, type: APOLLO_ERROR });
  }

  // Unique Slug
  const productExists = await Product.findOne({ slug: productSlug });
  if (productExists) {
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

  product["variations"].push(product._id);

  // Save product
  await product.save();

  return getResponse(product);
};
