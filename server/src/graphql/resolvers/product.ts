import { CreateProductPayload } from "../../types/Product";
import {
  createProduct,
  getAllProducts,
} from "../../controllers/product/productController";

import { checkIfAllowedRole } from "../../middlewares/customMiddleware";

type UserRoles = "user" | "admin" | "vendor";

export const productResolvers = {
  Query: {
    getAllProducts: () => {
      return getAllProducts();
    },
  },
  Mutation: {
    createProduct: async (
      _: any,
      payload: CreateProductPayload,
      { req }: any
    ) => {
      const allowedUserRoles: UserRoles[] = ["admin", "vendor"];
      await checkIfAllowedRole(req, allowedUserRoles);

      return createProduct({ ...payload, userId: req.user.id });
    },
  },
};
