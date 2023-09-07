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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const authController_1 = require("../../controllers/auth/authController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
exports.userResolvers = {
    Query: {
        getUserDetail: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, authMiddleware_1.isAuthenticated)(req);
            return yield (0, authController_1.getUserDetail)(req.user.id);
        }),
    },
    Mutation: {
        signUp: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, authController_1.signUp)(payload);
        }),
        signIn: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, authController_1.signIn)(payload);
        }),
        signInWithGoogle: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, authController_1.signInWithGoogle)(payload);
        }),
        forgotPassword: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, authController_1.forgotPassword)(payload);
        }),
        resetPassword: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, authController_1.resetPassword)(payload);
        }),
        convertToVendor: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, authMiddleware_1.isAuthenticated)(req);
            return yield (0, authController_1.convertToVendor)(Object.assign(Object.assign({}, payload), { userId: req.user.id }));
        }),
    },
};
//# sourceMappingURL=auth.js.map