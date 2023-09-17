import { merge } from "lodash";

import { userResolvers } from "./auth";
import { addressResolvers } from "./address";
import { categoryResolvers } from "./category";
import { productResolvers } from "./product";

export const resolvers = merge(
  userResolvers,
  addressResolvers,
  categoryResolvers,
  productResolvers
);
