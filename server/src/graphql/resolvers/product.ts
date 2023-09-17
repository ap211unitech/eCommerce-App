import { createProduct } from "../../controllers/product/productController";

import { checkIfAllowedRole } from "../../middlewares/customMiddleware";

export const productResolvers = {
  Query: {},
  Mutation: {
    createProduct: async (_: any, payload: any, { req }: any) => {
      await checkIfAllowedRole(req, ["admin", "vendor"]);
      return createProduct();
    },
  },
};
