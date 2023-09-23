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
exports.deleteProduct = exports.editProduct = exports.createProduct = exports.getAllProducts = void 0;
const error_1 = require("../../constants/error");
const errorTypes_1 = require("../../constants/errorTypes");
const slugify_1 = require("../../utils/slugify");
const errorHandler_1 = require("../../utils/errorHandler");
const product_1 = require("../../validators/product");
const Product_1 = __importDefault(require("../../models/Product"));
const User_1 = __importDefault(require("../../models/User"));
const helpers_1 = require("./helpers");
// @Desc    Get all products
// @Access  Public
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find({}).populate("categoryId createdBy updatedBy");
    return products.map((product) => (0, helpers_1.getResponse)(product));
});
exports.getAllProducts = getAllProducts;
// @Desc    Add product through form data
// @Access  Private (Only vendor/admin can create product)
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, name, description, specifications, filters, gallery, variations, discount, price, avaliableQuantity, userId, } = payload;
    // Validate Data
    yield (0, product_1.createProductValidation)(payload);
    // Create Slug
    const productSlug = (0, slugify_1.slugify)([name, description, specifications]);
    const product = yield new Product_1.default({
        categoryId,
        name,
        slug: productSlug,
        description,
        gallery,
        variations: variations !== null && variations !== void 0 ? variations : [],
        specifications,
        filters,
        price,
        avaliableQuantity,
        discount,
        createdBy: userId,
        updatedBy: userId,
    }).populate("categoryId createdBy updatedBy");
    product["variations"].unshift(product._id);
    // Save product
    yield product.save();
    return (0, helpers_1.getResponse)(product);
});
exports.createProduct = createProduct;
// @Desc    Edit product through form data
// @Access  Private (Admin can edit any product/Vendors can edit thier product only)
const editProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, categoryId, name, description, specifications, filters, gallery, variations, discount, price, avaliableQuantity, userId, isArchived, isFeatured, } = payload;
    // Validate Data
    yield (0, product_1.editProductValidation)(payload);
    // Create Slug
    const productSlug = (0, slugify_1.slugify)([name, description, specifications]);
    const updatedProductPayload = {
        categoryId,
        name,
        slug: productSlug,
        description,
        gallery,
        variations: variations.includes(productId)
            ? variations
            : [productId, ...variations],
        specifications,
        filters,
        price,
        avaliableQuantity,
        discount,
        updatedBy: userId,
        isFeatured,
        isArchived,
    };
    const updatedProduct = yield Product_1.default.findByIdAndUpdate(productId, { $set: Object.assign({}, updatedProductPayload) }, { new: true }).populate("categoryId createdBy updatedBy");
    if (!updatedProduct) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.CAN_NOT_EDIT_PRODUCT), { type: errorTypes_1.APOLLO_ERROR }));
    }
    return (0, helpers_1.getResponse)(updatedProduct);
});
exports.editProduct = editProduct;
// @Desc    Delete product & it's review through given productId
// @Access  Private (Admin can delete any product/Vendors can delete thier product only)
const deleteProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, userId } = payload;
    const user = yield User_1.default.findById(userId);
    const product = yield Product_1.default.findById(productId);
    if (!user) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_USER_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    if (!product) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_PRODUCT_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // If user is vendor, check if product created by that user
    if (user.role === "vendor") {
        if (product.createdBy.toString() !== user._id.toString()) {
            return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.UNAUTHORIZED_REQUEST), { type: errorTypes_1.APOLLO_ERROR }));
        }
    }
    // TODO: Delete all it's reviews
    yield Product_1.default.findByIdAndDelete(productId);
    return { message: "Product deleted successfully" };
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map