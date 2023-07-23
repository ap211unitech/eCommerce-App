import {
  CreateCategoryPayload,
  EditCategoryPayload,
} from "../../types/Category";
import {
  createCategory,
  editCategory,
  getCategory,
} from "../../controllers/category/categoryController";

import { isAuthenticated } from "../../middlewares/authMiddleware";
import { isAdmin } from "../../middlewares/adminMiddleware";

export const categoryResolvers = {
  Query: {
    getCategory: () => {
      return getCategory();
    },
  },
  Mutation: {
    createCategory: async (
      _: any,
      payload: CreateCategoryPayload,
      { req }: any
    ) => {
      await isAuthenticated(req);
      await isAdmin(req);

      return createCategory({ ...payload, userId: req.user.id });
    },
    editCategory: async (
      _: any,
      payload: EditCategoryPayload,
      { req }: any
    ) => {
      await isAuthenticated(req);
      await isAdmin(req);

      return editCategory({ ...payload, userId: req.user.id });
    },
  },
};
