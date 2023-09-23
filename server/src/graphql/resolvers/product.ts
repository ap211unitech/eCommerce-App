import {
  CreateProductPayload,
  DeleteProductPayload,
  EditProductPayload,
} from "../../types/Product";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  editProduct,
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
    editProduct: async (_: any, payload: EditProductPayload, { req }: any) => {
      const allowedUserRoles: UserRoles[] = ["admin", "vendor"];
      await checkIfAllowedRole(req, allowedUserRoles);

      return editProduct({ ...payload, userId: req.user.id });
    },
    deleteProduct: async (
      _: any,
      payload: DeleteProductPayload,
      { req }: any
    ) => {
      const allowedUserRoles: UserRoles[] = ["admin", "vendor"];
      await checkIfAllowedRole(req, allowedUserRoles);

      return await deleteProduct({ ...payload, userId: req.user.id });
    },
  },
};
