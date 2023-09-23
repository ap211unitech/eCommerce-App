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
exports.editProductValidation = exports.createProductValidation = void 0;
const error_1 = require("../constants/error");
const errorTypes_1 = require("../constants/errorTypes");
const slugify_1 = require("../utils/slugify");
const errorHandler_1 = require("../utils/errorHandler");
const helpers_1 = require("../controllers/product/helpers");
const Category_1 = __importDefault(require("../models/Category"));
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
// Validations for creating product
const createProductValidation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, name, description, specifications, filters, variations, discount, avaliableQuantity, gallery, } = payload;
    // Create Slug
    const productSlug = (0, slugify_1.slugify)([name, description, specifications]);
    //  Valid CategoryId
    const categoryExists = yield Category_1.default.findById(categoryId);
    if (!categoryExists) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_CATEGORY_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Unique Slug
    const productExists = yield Product_1.default.findOne({ slug: productSlug });
    if (productExists) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.PRODUCT_ALREADY_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Minimum 5 words in product name & description
    if (name.trim().split(" ").length <= 5) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.PRODUCT_NAME_TOO_SHORT), { type: errorTypes_1.APOLLO_ERROR }));
    }
    if (description.trim().split(" ").length <= 5) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.PRODUCT_DESCRIPTION_TOO_SHORT), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Valid JSON in specification & filters
    if (!(0, helpers_1.isValidJSON)(filters)) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_FILTERS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    if (!(0, helpers_1.isValidJSON)(specifications)) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_SPECIFICATIONS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Avaliable quantity must be greater than 0
    if (avaliableQuantity <= 0) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.PRODUCT_AVALIABLE_QUANTITY), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Avaliable quantity must be greater than 0
    if (discount < 0 || discount > 100) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_DISCOUNT), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // At least one image must exist
    if (gallery.length === 0) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.EMPTY_GALLERY), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Check if avaliable variations array has valid productId
    let isProductVariationError = false;
    for (let index = 0; index < variations.length; index++) {
        const productId = variations[index];
        const productVariationExists = yield Product_1.default.findById(productId);
        if (!productVariationExists) {
            isProductVariationError = true;
            break;
        }
    }
    if (isProductVariationError) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_PRODUCT_VARIATION), { type: errorTypes_1.APOLLO_ERROR }));
    }
});
exports.createProductValidation = createProductValidation;
// Validations for editing product
const editProductValidation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, userId, isFeatured } = payload;
    const productExists = yield Product_1.default.findById(productId);
    const user = yield User_1.default.findById(userId);
    // Check if product exists for given productId
    if (!productExists) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_PRODUCT_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    if (!user) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_USER_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    //  Only admin can feature product
    if (user.role !== "admin" && !productExists.isFeatured && isFeatured) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.CAN_NOT_FEATURE_PRODUCT), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Vendor can only edit thier product
    if (user.role === "vendor") {
        if (productExists.createdBy.toString() !== user._id.toString()) {
            return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.UNAUTHORIZED_REQUEST), { type: errorTypes_1.APOLLO_ERROR }));
        }
    }
    yield (0, exports.createProductValidation)(payload);
});
exports.editProductValidation = editProductValidation;
//# sourceMappingURL=product.js.map