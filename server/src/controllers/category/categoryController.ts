import {
  CreateCategoryPayload,
  EditCategoryPayload,
} from "../../types/Category";
import { AuthID } from "../../types/Auth";

import {
  CATEGORY_ALREADY_EXISTS,
  INVALID_FILTERS,
  INVALID_PARENT_CATEGORY,
  NO_SUCH_CATEGORY_EXISTS,
} from "../../constants/error";
import { APOLLO_ERROR } from "../../constants/errorTypes";

import { slugify } from "../../utils/slugify";
import { errorHandler } from "../../utils/errorHandler";

import Category from "../../models/Category";
import Filters from "../../models/Filters";
import { createNestedCategories, isValidFilters } from "./helpers";

// @Desc    Get all categories and it's filters
// @Access  Public
export const getCategory = async () => {
  const categories = await Category.find().populate("filter");

  const allCategories = categories.map((category) => {
    return {
      categoryId: category._id,
      name: category.name,
      parentId: category.parentId,
      filter: JSON.stringify(category?.filter),
      createdBy: category.createdBy,
      updatedBy: category.updatedBy,
      // @ts-ignore
      createdAt: category.createdAt,
      // @ts-ignore
      updatedAt: category.updatedAt,
    };
  });

  // Note - As per my research, Apollo Server/GraphQL doesn't support recurive return types.
  // So, We will pass our result as string and parse it in client side 😅
  return JSON.stringify(createNestedCategories(allCategories));
};

// @Desc    Create a new category and it's filters
// @Access  Private (Any admin can create)
export const createCategory = async (
  payload: CreateCategoryPayload & AuthID
) => {
  const {
    name: categoryName,
    parentId,
    userId,
    filters: stringifiedFilters = "{}",
  } = payload;

  // Validate Filters
  if (!isValidFilters(stringifiedFilters)) {
    return errorHandler({ ...INVALID_FILTERS, type: APOLLO_ERROR });
  }

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

  /****************  Create filters ****************/

  // Parse Filters
  const filters = JSON.parse(stringifiedFilters);

  // Create new filters
  const newFilters = new Filters({ filters });
  await newFilters.save();

  // Create category
  const newCategory = await new Category({
    name: categoryName,
    slug,
    createdBy: userId,
    updatedBy: userId,
    parentId,
    filter: newFilters._id,
  }).populate("filter");

  await newCategory.save();

  return {
    categoryId: newCategory._id,
    name: newCategory.name,
    parentId: newCategory.parentId,
    createdBy: newCategory.createdBy,
    updatedBy: newCategory.updatedBy,
    // @ts-ignore
    filter: JSON.stringify(newCategory.filter),
    // @ts-ignore
    createdAt: newCategory.createdAt,
    // @ts-ignore
    updatedAt: newCategory.updatedAt,
  };
};

// @Desc    Edit a category by getting categoryId and it's corresponding filters
// @Access  Private (Any Admin can edit)
export const editCategory = async (payload: EditCategoryPayload & AuthID) => {
  const {
    categoryId,
    name: categoryName,
    parentId,
    userId,
    filters: stringifiedFilters = "{}",
  } = payload;

  // Validate Filters
  if (!isValidFilters(stringifiedFilters)) {
    return errorHandler({ ...INVALID_FILTERS, type: APOLLO_ERROR });
  }

  // Check if category exists for given categoryId
  const findCategory = await Category.findById(categoryId);
  if (!findCategory) {
    return errorHandler({ ...NO_SUCH_CATEGORY_EXISTS, type: APOLLO_ERROR });
  }

  // Check if Valid ParentId is given
  if (parentId) {
    const parentExists = await Category.findById(parentId);
    if (
      !parentExists ||
      parentExists._id.toString() === categoryId.toString() // If one wants to make same parentId as categoryId
    ) {
      return errorHandler({ ...INVALID_PARENT_CATEGORY, type: APOLLO_ERROR });
    }
  }

  // Create Slug
  const slug = slugify([categoryName]);

  // Check if category exists already
  const categoryExists = await Category.findOne({ slug });
  if (categoryExists && categoryExists._id.toString() !== categoryId) {
    return errorHandler({ ...CATEGORY_ALREADY_EXISTS, type: APOLLO_ERROR });
  }

  /****************  Edit filters ****************/

  // Parse Filters
  const filters = JSON.parse(stringifiedFilters);

  await Filters.findOneAndUpdate(
    {
      _id: findCategory.filter,
    },
    {
      $set: {
        filters,
      },
    },
    { new: true }
  );

  const category = await Category.findByIdAndUpdate(
    categoryId,
    { $set: { name: categoryName, slug, updatedBy: userId, parentId } },
    { new: true }
  ).populate("filter");

  return {
    categoryId: category?._id,
    name: category?.name,
    parentId: category?.parentId,
    createdBy: category?.createdBy,
    updatedBy: category?.updatedBy,
    // @ts-ignore
    filter: JSON.stringify(category?.filter),
    // @ts-ignore
    createdAt: category?.createdAt,
    // @ts-ignore
    updatedAt: category?.updatedAt,
  };
};
