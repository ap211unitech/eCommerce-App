"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNestedCategories = exports.isValidFilters = void 0;
// Check if filters are valid JSON
const isValidFilters = (payload) => {
    try {
        if (payload.trim().length) {
            JSON.parse(payload);
            return true;
        }
        return false;
    }
    catch (err) {
        return false;
    }
};
exports.isValidFilters = isValidFilters;
// Converts plain list of categories to nested categories using parentId
const createNestedCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId === null || (parentId === null || parentId === void 0 ? void 0 : parentId.toString().trim().length) === 0) {
        category = categories.filter((c) => { var _a; return c.parentId === undefined || ((_a = c.parentId) === null || _a === void 0 ? void 0 : _a.toString().trim().length) === 0; } // If parentId == ""
        );
    }
    else {
        category = categories.filter((c) => { var _a; return ((_a = c.parentId) === null || _a === void 0 ? void 0 : _a.toString()) === parentId; });
    }
    for (const c of category) {
        categoryList.push({
            categoryId: c.categoryId,
            name: c.name,
            filter: c.filter,
            children: (0, exports.createNestedCategories)(categories, c.categoryId.toString()),
            createdBy: c.createdBy,
            updatedBy: c.updatedBy,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
        });
    }
    return categoryList;
};
exports.createNestedCategories = createNestedCategories;
//# sourceMappingURL=helpers.js.map