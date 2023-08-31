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
exports.verifyOTP = exports.sendOTP = exports.hashData = exports.generateToken = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("../../validators/index");
const error_1 = require("../../constants/error");
const errorTypes_1 = require("../../constants/errorTypes");
const errorHandler_1 = require("../../utils/errorHandler");
const generateOTP_1 = require("../../utils/generateOTP");
const User_1 = __importDefault(require("../../models/User"));
const Otp_1 = __importDefault(require("../../models/Otp"));
const mail_1 = require("../../utils/mail");
dotenv_1.default.config({ path: __dirname + "/../../.env" });
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtsecret";
/********************************** Helper Functions **********************************/
// Generate Token
const generateToken = (id) => {
    const payload = { id };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
};
exports.generateToken = generateToken;
// Hash Data
const hashData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedData = yield bcryptjs_1.default.hash(payload, salt);
    return hashedData;
});
exports.hashData = hashData;
// OTP Sending Process
const sendOTP = ({ type, payload, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { identity } = payload;
    // Check if any user exists for that email/mobile
    const user = type === "email"
        ? yield User_1.default.findOne({ email: identity })
        : yield User_1.default.findOne({ mobile: identity });
    if (!user) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_USER_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Clear Old records
    yield Otp_1.default.deleteMany({ userId: user._id });
    // Generate OTP
    const newOTP = (0, generateOTP_1.generateOTP)();
    // Hash OTP
    const hashedOTP = yield (0, exports.hashData)(newOTP);
    // Save in OTP Schema
    yield Otp_1.default.create({
        userId: user._id,
        otp: hashedOTP,
        expiresAt: Date.now() + 600000, // 10 min
    });
    if (type === "email") {
        yield (0, mail_1.forgotPasswordEmail)({ to: user.email, otp: newOTP });
    }
    else if (type === "mobile") {
        //TODO: Send SMS
    }
});
exports.sendOTP = sendOTP;
// Verify OTP and Change Password
const verifyOTP = ({ type, payload, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { identity, otp, newPassword } = payload;
    // Find User
    const user = type === "email"
        ? yield User_1.default.findOne({ email: identity })
        : yield User_1.default.findOne({ mobile: identity });
    if (!user) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_USER_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Find OTP
    const findOTP = yield Otp_1.default.findOne({ userId: user._id });
    // Check if OTP exists for that userID
    if (!findOTP) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_OTP_FOUND), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Check if OTP is not expired
    if (findOTP.expiresAt.getTime() < Date.now()) {
        // Delete OTP if expired
        yield Otp_1.default.deleteMany({ userId: user._id });
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.OTP_EXPIRED), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Check if OTP matched
    const matchOTP = yield bcryptjs_1.default.compare(otp, findOTP.otp);
    if (!matchOTP) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INCORRECT_OTP), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Validate Password
    const error = (0, index_1.validatePassword)(newPassword);
    if (error) {
        return (0, errorHandler_1.errorHandler)({ message: error, type: errorTypes_1.VALIDATION_ERROR });
    }
    // Hash Password
    const hashedPassword = yield (0, exports.hashData)(newPassword);
    user.password = hashedPassword;
    yield user.save();
    // Delete OTP when password changed
    yield Otp_1.default.deleteMany({ userId: user._id });
});
exports.verifyOTP = verifyOTP;
//# sourceMappingURL=helpers.js.map