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
exports.addressResolvers = void 0;
const addressController_1 = require("../../controllers/address/addressController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
exports.addressResolvers = {
    Query: {
        getAddress: (_, __, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, authMiddleware_1.isAuthenticated)(req);
            return (0, addressController_1.getAddress)({ userId: req.user.id });
        }),
    },
    Mutation: {
        addAddress: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, authMiddleware_1.isAuthenticated)(req);
            return yield (0, addressController_1.addAddress)(Object.assign(Object.assign({}, payload), { userId: req.user.id }));
        }),
        editAddress: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, authMiddleware_1.isAuthenticated)(req);
            return yield (0, addressController_1.editAddress)(Object.assign(Object.assign({}, payload), { userId: req.user.id }));
        }),
        deleteAddress: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, authMiddleware_1.isAuthenticated)(req);
            return yield (0, addressController_1.deleteAddress)(Object.assign(Object.assign({}, payload), { userId: req.user.id }));
        }),
    },
};
//# sourceMappingURL=address.js.map