"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "category",
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Product name can not be empty"],
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Product slug can not be empty"],
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Product description can not be empty"],
    },
    gallery: {
        type: [String],
        required: [true, "Product images(s) must be given"],
    },
    variations: {
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
        ],
        required: true,
    },
    specifications: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
    filters: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "Product Price can not be empty"],
    },
    avaliableQuantity: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
        required: true,
    },
    rating: {
        type: String,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("product", productSchema);
//# sourceMappingURL=Product.js.map