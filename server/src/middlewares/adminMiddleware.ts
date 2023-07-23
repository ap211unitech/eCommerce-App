import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { errorHandler } from "../utils/errorHandler";
import { AUTHENTICATION_ERROR } from "../constants/errorTypes";

import User from "../models/User";

dotenv.config({ path: __dirname + "/../../.env" });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtsecret";

export const isAdmin = async (req: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, JWT_SECRET_KEY);

      const findUser = await User.findById(decoded.id);
      if (findUser?.role === "admin") req.user = decoded;

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
