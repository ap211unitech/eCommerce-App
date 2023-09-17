import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { errorHandler } from "../utils/errorHandler";
import { AUTHENTICATION_ERROR } from "../constants/errorTypes";

import User from "../models/User";

dotenv.config({ path: __dirname + "/../../.env" });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtsecret";

type UserRoles = "user" | "admin" | "vendor";

export const checkIfAllowedRole = async (
  req: any,
  allowedUserRoles: UserRoles[]
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, JWT_SECRET_KEY);

      const findUser = await User.findById(decoded.id);

      if (allowedUserRoles.includes(findUser?.role || "vendor")) {
        req.user = decoded;
        return;
      }

      return errorHandler({
        message: "You don't have access for this request",
        type: AUTHENTICATION_ERROR,
      });
    } catch (err: any) {
      console.log(err);
      return errorHandler({
        message: err.message || "Not Authorized",
        type: AUTHENTICATION_ERROR,
      });
    }
  } else {
    return errorHandler({
      message: "Not Authorized, No token Found",
      type: AUTHENTICATION_ERROR,
    });
  }
};
