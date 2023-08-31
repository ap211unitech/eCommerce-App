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
exports.vendorRequestEmail = exports.forgotPasswordEmail = void 0;
const path_1 = __importDefault(require("path"));
// Environmental Variables
require("dotenv").config({ path: path_1.default.resolve(__dirname, "../../.env") });
const API_KEY = process.env.SENDGRID_KEY || "";
const SENDER_EMAIL = process.env.SENDER_EMAIL || "";
const mail_1 = __importDefault(require("@sendgrid/mail"));
const mailTemplate_1 = require("./mailTemplate");
mail_1.default.setApiKey(API_KEY);
// Reset Password - Sends OTP to Email
const forgotPasswordEmail = ({ to, otp, }) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        to: [to],
        from: {
            name: "eCommerce",
            email: SENDER_EMAIL,
        },
        subject: "Reset your password",
        html: (0, mailTemplate_1.sendEmailForOTPTemplate)(otp),
    };
    try {
        yield mail_1.default.send(message);
        console.log("OTP sent to email...");
    }
    catch (err) {
        console.log(err);
    }
});
exports.forgotPasswordEmail = forgotPasswordEmail;
// Request to be a vendor
const vendorRequestEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        to: [SENDER_EMAIL],
        from: {
            name: "eCommerce",
            email: SENDER_EMAIL,
        },
        subject: "Someone wants to become a vendor",
        html: (0, mailTemplate_1.sendEmailForRequestToBeVendor)(payload),
    };
    try {
        yield mail_1.default.send(message);
        console.log("Email sent for request to be a vendor...");
    }
    catch (err) {
        console.log(err);
    }
});
exports.vendorRequestEmail = vendorRequestEmail;
//# sourceMappingURL=mail.js.map