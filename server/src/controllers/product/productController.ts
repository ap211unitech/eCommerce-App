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
} from "../../constants/error";
import { APOLLO_ERROR } from "../../constants/errorTypes";

import { slugify } from "../../utils/slugify";
import { errorHandler } from "../../utils/errorHandler";

import Category from "../../models/Category";
import Product from "../../models/Product";
import { isValidJSON } from "./helpers";

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
  if (name.trim().length <= 5) {
    return errorHandler({ ...PRODUCT_NAME_TOO_SHORT, type: APOLLO_ERROR });
  }

  if (description.trim().length <= 5) {
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

  // TODO: Make filters and specifications required in Product schema

  const product = new Product({
    categoryId,
    name,
    slug: productSlug,
    description,
    gallery,
    variations,
    specifications,
    filters,
    price,
    avaliableQuantity,
    discount,
    createdBy: userId,
    updatedBy: userId,
  });

  // Save product
  await product.save();

  // Update product and add current product id in varations array

  return `create product controller`;
};
