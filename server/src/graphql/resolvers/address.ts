import {
  EditUserAddressPayload,
  UserAddressPayload,
} from "../../types/Address";
import { isAuthenticated } from "../../middlewares/authMiddleware";

import {
  addAddress,
  editAddress,
} from "../../controllers/address/addressController";

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
    editAddress: async (
      _: any,
      payload: EditUserAddressPayload,
      { req }: any
    ) => {
      await isAuthenticated(req);
      return await editAddress({ ...payload, userId: req.user.id });
    },
  },
};
