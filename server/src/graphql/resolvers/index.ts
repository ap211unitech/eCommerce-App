import { merge } from "lodash";

import { userResolvers } from "./auth";
import { addressResolvers } from "./address";

export const resolvers = merge(userResolvers, addressResolvers);
