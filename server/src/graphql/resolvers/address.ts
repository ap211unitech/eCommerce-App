import { UserAddressPayload } from "../../types/Address";
import { isAuthenticated } from "../../middlewares/authMiddleware";

import { addAddress } from "../../controllers/address/addressController";

export const addressResolvers = {
  Query: {
    getAddress: () => {
      return "Here is your address";
    },
  },
  Mutation: {
    addAddress: async (_: any, payload: UserAddressPayload, { req }: any) => {
      await isAuthenticated(req);
      return await addAddress({ ...payload, userId: req.user.id });
    },
  },
};
