"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    otp: {
        type: String,
        trim: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("otp", otpSchema);
//# sourceMappingURL=Otp.js.map