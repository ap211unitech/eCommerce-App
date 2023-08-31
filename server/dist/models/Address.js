"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userAddressSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    pincode: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    locality: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ["home", "office"],
        required: true,
        trim: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
        required: true,
    },
});
exports.default = mongoose_1.default.model("userAddress", userAddressSchema);
//# sourceMappingURL=Address.js.map