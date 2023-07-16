import {
  DeleteUserAddressPayload,
  EditUserAddressPayload,
  UserAddressPayload,
} from "../../types/Address";
import { isAuthenticated } from "../../middlewares/authMiddleware";

import {
  addAddress,
  deleteAddress,
  editAddress,
  getAddress,
} from "../../controllers/address/addressController";

export const addressResolvers = {
  Query: {
    getAddress: async (_: any, __: any, { req }: any) => {
      await isAuthenticated(req);
      return getAddress({ userId: req.user.id });
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
    deleteAddress: async (
      _: any,
      payload: DeleteUserAddressPayload,
      { req }: any
    ) => {
      await isAuthenticated(req);
      return await deleteAddress({ ...payload, userId: req.user.id });
    },
  },
};
