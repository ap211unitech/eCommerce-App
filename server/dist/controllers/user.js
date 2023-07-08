"use strict";
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
exports.signUp = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const index_1 = require("../validators/index");
const error_1 = require("../constants/error");
const User_1 = __importDefault(require("../models/User"));
// SignUp User
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, mobile } = payload;
    const error = (0, index_1.validateSignUpInput)(payload);
    if (error) {
        throw new apollo_server_express_1.ValidationError(error);
    }
    // Check if user already exists
    const userExists = yield User_1.default.findOne({ $or: [{ email }, { mobile }] });
    if (userExists) {
        const { message, code } = error_1.USER_ALREADY_EXISTS;
        throw new apollo_server_express_1.ApolloError(message, code);
    }
    const newUser = new User_1.default(payload);
    yield newUser.save();
    return newUser;
});
exports.signUp = signUp;
//# sourceMappingURL=user.js.map