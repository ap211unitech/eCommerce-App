"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productReviewSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "product",
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("productReview", productReviewSchema);
//# sourceMappingURL=ProductReview.js.map