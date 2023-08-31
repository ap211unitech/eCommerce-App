"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../utils/errorHandler");
const errorTypes_1 = require("../constants/errorTypes");
dotenv.config({ path: __dirname + "/../../.env" });
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtsecret";
const isAuthenticated = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
            // @ts-ignore
            req.user = decoded;
        }
        catch (err) {
            console.log(err);
            return (0, errorHandler_1.errorHandler)({
                message: "Not Authorized",
                type: errorTypes_1.AUTHENTICATION_ERROR,
            });
        }
    }
    else {
        return (0, errorHandler_1.errorHandler)({
            message: "Not Authorized, No token Found",
            type: errorTypes_1.AUTHENTICATION_ERROR,
        });
    }
});
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authMiddleware.js.map