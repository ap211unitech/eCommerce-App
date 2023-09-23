import { AuthID } from "../types/Auth";
import { CreateProductPayload, EditProductPayload } from "../types/Product";

import {
  NO_SUCH_CATEGORY_EXISTS,
  PRODUCT_ALREADY_EXISTS,
  PRODUCT_NAME_TOO_SHORT,
  PRODUCT_DESCRIPTION_TOO_SHORT,
  INVALID_SPECIFICATIONS,
  INVALID_FILTERS,
  PRODUCT_AVALIABLE_QUANTITY,
  INVALID_PRODUCT_VARIATION,
  INVALID_DISCOUNT,
  EMPTY_GALLERY,
  NO_SUCH_PRODUCT_EXISTS,
  UNAUTHORIZED_REQUEST,
  NO_SUCH_USER_EXISTS,
  CAN_NOT_FEATURE_PRODUCT,
} from "../constants/error";
import { APOLLO_ERROR } from "../constants/errorTypes";

import { slugify } from "../utils/slugify";
import { errorHandler } from "../utils/errorHandler";

import { isValidJSON } from "../controllers/product/helpers";

import Category from "../models/Category";
import Product from "../models/Product";
import User from "../models/User";

// Validations for creating product
export const createProductValidation = async (
  payload: CreateProductPayload & AuthID
) => {
  const {
    categoryId,
    name,
    description,
    specifications,
    filters,
    variations,
    discount,
    avaliableQuantity,
    gallery,
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

  // Avaliable quantity must be greater than 0
  if (discount < 0 || discount > 100) {
    return errorHandler({ ...INVALID_DISCOUNT, type: APOLLO_ERROR });
  }

  // At least one image must exist
  if (gallery.length === 0) {
    return errorHandler({ ...EMPTY_GALLERY, type: APOLLO_ERROR });
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
};

// Validations for editing product
export const editProductValidation = async (
  payload: EditProductPayload & AuthID
) => {
  const { productId, userId, isFeatured } = payload;

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
  if (user.role !== "admin" && !productExists.isFeatured && isFeatured) {
    return errorHandler({ ...CAN_NOT_FEATURE_PRODUCT, type: APOLLO_ERROR });
  }

  // Vendor can only edit thier product
  if (user.role === "vendor") {
    if (productExists.createdBy.toString() !== user._id.toString()) {
      return errorHandler({ ...UNAUTHORIZED_REQUEST, type: APOLLO_ERROR });
    }
  }

  await createProductValidation(payload);
};
