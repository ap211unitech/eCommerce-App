"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name can not be empty"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email can not be empty"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password can not be empty"],
    },
    mobile: {
        type: String,
        required: [true, "Mobile number can not be empty"],
        trim: true,
    },
});
exports.default = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=User.js.map