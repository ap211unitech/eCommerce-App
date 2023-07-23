import {
  CreateCategoryPayload,
  EditCategoryPayload,
} from "../../types/Category";
import {
  createCategory,
  editCategory,
} from "../../controllers/category/categoryController";

import { isAuthenticated } from "../../middlewares/authMiddleware";

export const categoryResolvers = {
  Mutation: {
    createCategory: async (
      _: any,
      payload: CreateCategoryPayload,
      { req }: any
    ) => {
      await isAuthenticated(req);
      return createCategory({ ...payload, userId: req.user.id });
    },
    editCategory: async (
      _: any,
      payload: EditCategoryPayload,
      { req }: any
    ) => {
      await isAuthenticated(req);
      return editCategory({ ...payload, userId: req.user.id });
    },
  },
};
