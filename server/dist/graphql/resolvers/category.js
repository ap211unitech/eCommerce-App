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
exports.categoryResolvers = void 0;
const categoryController_1 = require("../../controllers/category/categoryController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const adminMiddleware_1 = require("../../middlewares/adminMiddleware");
exports.categoryResolvers = {
    Query: {
        getCategory: () => {
            return (0, categoryController_1.getCategory)();
        },
    },
    Mutation: {
        createCategory: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, authMiddleware_1.isAuthenticated)(req);
            yield (0, adminMiddleware_1.isAdmin)(req);
            return (0, categoryController_1.createCategory)(Object.assign(Object.assign({}, payload), { userId: req.user.id }));
        }),
        editCategory: (_, payload, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, authMiddleware_1.isAuthenticated)(req);
            yield (0, adminMiddleware_1.isAdmin)(req);
            return (0, categoryController_1.editCategory)(Object.assign(Object.assign({}, payload), { userId: req.user.id }));
        }),
    },
};
//# sourceMappingURL=category.js.map