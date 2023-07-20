import { merge } from "lodash";

import { userResolvers } from "./auth";
import { addressResolvers } from "./address";
import { categoryResolvers } from "./category";

export const resolvers = merge(
  userResolvers,
  addressResolvers,
  categoryResolvers
);
