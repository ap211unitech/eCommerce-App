"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = exports.isValidJSON = void 0;
// Check if filters/specifications are valid JSON
const isValidJSON = (payload) => {
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
exports.isValidJSON = isValidJSON;
// Returns response of GraphQL type Product
const getResponse = (product) => {
    return {
        productId: product._id,
        category: Object.assign({ 
            // @ts-ignore
            categoryId: product.categoryId._id }, product.categoryId._doc),
        name: product.name,
        slug: product.slug,
        description: product.description,
        gallery: product.gallery,
        variations: product.variations,
        specifications: product.specifications,
        filters: product.filters,
        price: product.price,
        avaliableQuantity: product.avaliableQuantity,
        discount: product.discount,
        rating: product.rating,
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        createdBy: product.createdBy,
        updatedBy: product.updatedBy,
        // @ts-ignore
        createdAt: product.createdAt,
        // @ts-ignore
        updatedAt: product.updatedAt,
    };
};
exports.getResponse = getResponse;
//# sourceMappingURL=helpers.js.map