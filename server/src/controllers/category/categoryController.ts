import { CreateCategoryPayload } from "../../types/Category";
import { AuthID } from "../../types/Auth";

// @Desc    Create a new category and it's filters
// @Access  Private
export const createCategory = (payload: CreateCategoryPayload & AuthID) => {
  const { name: categoryName, parentId, userId } = payload;

  return "Category Created";
};
