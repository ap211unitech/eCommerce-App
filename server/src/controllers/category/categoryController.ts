import { CreateCategoryPayload } from "../../types/Category";
import { AuthID } from "../../types/Auth";

import {
  CATEGORY_ALREADY_EXISTS,
  INVALID_PARENT_CATEGORY,
} from "../../constants/error";
import { APOLLO_ERROR } from "../../constants/errorTypes";

import { slugify } from "../../utils/slugify";
import { errorHandler } from "../../utils/errorHandler";

import Category from "../../models/Category";

// @Desc    Create a new category and it's filters
// @Access  Private
export const createCategory = async (
  payload: CreateCategoryPayload & AuthID
) => {
  const {
    name: categoryName,
    parentId,
    userId,
    filters: stringifiedFilters,
  } = payload;

  // Parse Filters
  const filters = JSON.parse(stringifiedFilters);

  // Create Slug
  const slug = slugify([categoryName]);

  // Check if category exists already
  const categoryExists = await Category.findOne({ slug });
  if (categoryExists) {
    return errorHandler({ ...CATEGORY_ALREADY_EXISTS, type: APOLLO_ERROR });
  }

  // Check if Valid ParentId is given
  if (parentId) {
    const parentExists = await Category.findById(parentId);
    if (!parentExists) {
      return errorHandler({ ...INVALID_PARENT_CATEGORY, type: APOLLO_ERROR });
    }
  }

  // Create category
  const newCategory = await new Category({
    name: categoryName,
    slug,
    parentId,
    createdBy: userId,
    updatedBy: userId,
  }).populate("createdBy updatedBy");

  await newCategory.save();

  return {
    categoryId: newCategory._id,
    name: newCategory.name,
    parentId: newCategory.parentId,
    createdBy: newCategory.createdBy,
    updatedBy: newCategory.updatedBy,
    // @ts-ignore
    createdAt: newCategory.createdAt,
    // @ts-ignore
    updatedAt: newCategory.updatedAt,
  };
};
