import mongoose, { ObjectId } from "mongoose";

// Check if filters are valid JSON
export const isValidFilters = (payload: string) => {
  try {
    if (payload.trim().length) {
      JSON.parse(payload);
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

type Category = {
  categoryId: mongoose.Schema.Types.ObjectId;
  name: string;
  parentId: ObjectId;
  filter: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
};

type ReturnItems = {
  categoryId: mongoose.Schema.Types.ObjectId;
  name: string;
  filter: string;
  children: ReturnItems[];
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
};

// Converts plain list of categories to nested categories using parentId
export const createNestedCategories = (
  categories: Category[],
  parentId: string | null = null
): ReturnItems[] => {
  const categoryList = [];
  let category;
  if (parentId === null || parentId?.toString().trim().length === 0) {
    category = categories.filter(
      (c) =>
        c.parentId === undefined || c.parentId?.toString().trim().length === 0 // If parentId == ""
    );
  } else {
    category = categories.filter((c) => c.parentId?.toString() === parentId);
  }

  for (const c of category) {
    categoryList.push({
      categoryId: c.categoryId,
      name: c.name,
      filter: c.filter,
      children: createNestedCategories(categories, c.categoryId.toString()),
      createdBy: c.createdBy,
      updatedBy: c.updatedBy,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    });
  }

  return categoryList;
};
