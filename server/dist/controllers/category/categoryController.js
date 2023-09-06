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
exports.editCategory = exports.createCategory = exports.getCategory = void 0;
const error_1 = require("../../constants/error");
const errorTypes_1 = require("../../constants/errorTypes");
const slugify_1 = require("../../utils/slugify");
const errorHandler_1 = require("../../utils/errorHandler");
const Category_1 = __importDefault(require("../../models/Category"));
const Filters_1 = __importDefault(require("../../models/Filters"));
const helpers_1 = require("./helpers");
// @Desc    Get all categories and it's filters
// @Access  Public
const getCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield Category_1.default.find().populate("filter");
    const allCategories = categories.map((category) => {
        return {
            categoryId: category._id,
            name: category.name,
            parentId: category.parentId,
            filter: JSON.stringify(category === null || category === void 0 ? void 0 : category.filter),
            createdBy: category.createdBy,
            updatedBy: category.updatedBy,
            // @ts-ignore
            createdAt: category.createdAt,
            // @ts-ignore
            updatedAt: category.updatedAt,
        };
    });
    // Note - As per my research, Apollo Server/GraphQL doesn't support recurive return types.
    // So, We will pass our result as string and parse it in client side 😅
    return JSON.stringify((0, helpers_1.createNestedCategories)(allCategories));
});
exports.getCategory = getCategory;
// @Desc    Create a new category and it's filters
// @Access  Private (Any admin can create)
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: categoryName, parentId, userId, filters: stringifiedFilters = "{}", } = payload;
    // Validate Filters
    if (!(0, helpers_1.isValidFilters)(stringifiedFilters)) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_FILTERS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Create Slug
    const slug = (0, slugify_1.slugify)([categoryName]);
    // Check if category exists already it it has no parent category
    // It means parent catagory should always be unique
    const categoryExists = yield Category_1.default.findOne({ slug });
    if (categoryExists && !parentId) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.CATEGORY_ALREADY_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Check if Valid ParentId is given
    if (parentId) {
        const parentExists = yield Category_1.default.findById(parentId);
        if (!parentExists) {
            return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_PARENT_CATEGORY), { type: errorTypes_1.APOLLO_ERROR }));
        }
    }
    /****************  Create filters ****************/
    // Parse Filters
    const filters = JSON.parse(stringifiedFilters);
    // Create new filters
    const newFilters = new Filters_1.default({ filters });
    yield newFilters.save();
    // Create category
    const newCategory = yield new Category_1.default({
        name: categoryName,
        slug,
        createdBy: userId,
        updatedBy: userId,
        parentId,
        filter: newFilters._id,
    }).populate("filter");
    yield newCategory.save();
    return {
        categoryId: newCategory._id,
        name: newCategory.name,
        parentId: newCategory.parentId,
        createdBy: newCategory.createdBy,
        updatedBy: newCategory.updatedBy,
        // @ts-ignore
        filter: JSON.stringify(newCategory.filter),
        // @ts-ignore
        createdAt: newCategory.createdAt,
        // @ts-ignore
        updatedAt: newCategory.updatedAt,
    };
});
exports.createCategory = createCategory;
// @Desc    Edit a category by getting categoryId and it's corresponding filters
// @Access  Private (Any Admin can edit)
const editCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, name: categoryName, parentId, userId, filters: stringifiedFilters = "{}", } = payload;
    // Validate Filters
    if (!(0, helpers_1.isValidFilters)(stringifiedFilters)) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_FILTERS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Check if category exists for given categoryId
    const findCategory = yield Category_1.default.findById(categoryId);
    if (!findCategory) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_CATEGORY_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Check if Valid ParentId is given
    if (parentId) {
        const parentExists = yield Category_1.default.findById(parentId);
        if (!parentExists ||
            parentExists._id.toString() === categoryId.toString() // If one wants to make same parentId as categoryId
        ) {
            return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_PARENT_CATEGORY), { type: errorTypes_1.APOLLO_ERROR }));
        }
    }
    // Create Slug
    const slug = (0, slugify_1.slugify)([categoryName]);
    // Check if category exists already
    const categoryExists = yield Category_1.default.findOne({ slug });
    if (categoryExists && categoryExists._id.toString() !== categoryId) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.CATEGORY_ALREADY_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    /****************  Edit filters ****************/
    // Parse Filters
    const filters = JSON.parse(stringifiedFilters);
    yield Filters_1.default.findOneAndUpdate({
        _id: findCategory.filter,
    }, {
        $set: {
            filters,
        },
    }, { new: true });
    const category = yield Category_1.default.findByIdAndUpdate(categoryId, { $set: { name: categoryName, slug, updatedBy: userId, parentId } }, { new: true }).populate("filter");
    return {
        categoryId: category === null || category === void 0 ? void 0 : category._id,
        name: category === null || category === void 0 ? void 0 : category.name,
        parentId: category === null || category === void 0 ? void 0 : category.parentId,
        createdBy: category === null || category === void 0 ? void 0 : category.createdBy,
        updatedBy: category === null || category === void 0 ? void 0 : category.updatedBy,
        // @ts-ignore
        filter: JSON.stringify(category === null || category === void 0 ? void 0 : category.filter),
        // @ts-ignore
        createdAt: category === null || category === void 0 ? void 0 : category.createdAt,
        // @ts-ignore
        updatedAt: category === null || category === void 0 ? void 0 : category.updatedAt,
    };
});
exports.editCategory = editCategory;
//# sourceMappingURL=categoryController.js.map