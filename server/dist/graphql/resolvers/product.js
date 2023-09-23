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
exports.productResolvers = void 0;
const productController_1 = require("../../controllers/product/productController");
const customMiddleware_1 = require("../../middlewares/customMiddleware");
exports.productResolvers = {
    Query: {
        getAllProducts: () => {
            return (0, productController_1.getAllProducts)();
        },
    },
    Mutation: {
        createProduct: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const allowedUserRoles = ["admin", "vendor"];
            yield (0, customMiddleware_1.checkIfAllowedRole)(req, allowedUserRoles);
            return (0, productController_1.createProduct)(Object.assign(Object.assign({}, payload), { userId: req.user.id }));
        }),
        editProduct: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const allowedUserRoles = ["admin", "vendor"];
            yield (0, customMiddleware_1.checkIfAllowedRole)(req, allowedUserRoles);
            return (0, productController_1.editProduct)(Object.assign(Object.assign({}, payload), { userId: req.user.id }));
        }),
        deleteProduct: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const allowedUserRoles = ["admin", "vendor"];
            yield (0, customMiddleware_1.checkIfAllowedRole)(req, allowedUserRoles);
            return yield (0, productController_1.deleteProduct)(Object.assign(Object.assign({}, payload), { userId: req.user.id }));
        }),
    },
};
//# sourceMappingURL=product.js.map