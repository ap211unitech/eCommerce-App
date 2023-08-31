"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const slugify_1 = __importDefault(require("slugify"));
const slugify = (data) => {
    const payload = data.join(" ");
    const slug = (0, slugify_1.default)(payload, {
        replacement: "",
        lower: true,
    });
    return slug;
};
exports.slugify = slugify;
//# sourceMappingURL=slugify.js.map