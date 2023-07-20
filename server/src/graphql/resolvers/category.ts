import { CreateCategoryPayload } from "../../types/Category";
import { createCategory } from "../../controllers/category/categoryController";

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
  },
};
