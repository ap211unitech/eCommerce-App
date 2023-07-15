import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { errorHandler } from "../utils/errorHandler";
import { AUTHENTICATION_ERROR } from "../constants/errorTypes";

dotenv.config({ path: __dirname + "/../../.env" });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtsecret";

export const isAuthenticated = async (req: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      // @ts-ignore
      req.user = decoded;
    } catch (err) {
      console.log(err);
      return errorHandler({
        message: "Not Authorized",
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
