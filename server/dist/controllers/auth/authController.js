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
exports.convertToVendor = exports.getUserDetail = exports.resetPassword = exports.forgotPassword = exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = require("../../validators/index");
const error_1 = require("../../constants/error");
const errorTypes_1 = require("../../constants/errorTypes");
const errorHandler_1 = require("../../utils/errorHandler");
const helpers_1 = require("./helpers");
const User_1 = __importDefault(require("../../models/User"));
const mail_1 = require("../../utils/mail");
// @Desc    Register New user through form data
// @Access  Public
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, mobile, password } = payload;
    const error = (0, index_1.validateSignUpInput)(payload);
    if (error) {
        return (0, errorHandler_1.errorHandler)({ message: error, type: errorTypes_1.VALIDATION_ERROR });
    }
    // Check if user already exists
    const userExists = yield User_1.default.findOne({ $or: [{ email }, { mobile }] });
    if (userExists) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.USER_ALREADY_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Hash Password
    const hashedPassword = yield (0, helpers_1.hashData)(password);
    const newUser = new User_1.default(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
    yield newUser.save();
    // Generate token
    const token = (0, helpers_1.generateToken)(newUser._id, newUser.role);
    return {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role,
        // @ts-ignore
        createdAt: newUser.createdAt,
        // @ts-ignore
        updatedAt: newUser.updatedAt,
        token,
    };
});
exports.signUp = signUp;
// @Desc    Login user through form data
// @Access  Public
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { identity, password } = payload;
    // Check if user exists
    const user = yield User_1.default.findOne({
        $or: [{ email: identity }, { mobile: identity }],
    });
    if (!user) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_CREDENTIALS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Verify Password
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.INVALID_CREDENTIALS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Generate token
    const token = (0, helpers_1.generateToken)(user._id, user.role);
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        // @ts-ignore
        createdAt: user.createdAt,
        // @ts-ignore
        updatedAt: user.updatedAt,
        token,
    };
});
exports.signIn = signIn;
// @Desc    Forgot Password (Sending OTP to email/mobile)
// @Access  Public
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { identity } = payload;
    // Check If valid email
    if ((0, index_1.isValidEmail)(identity)) {
        yield (0, helpers_1.sendOTP)({ type: "email", payload });
        return { message: "OTP Sent Successfully to your email address" };
    }
    // Check If valid mobile number
    if ((0, index_1.isValidMobile)(identity)) {
        yield (0, helpers_1.sendOTP)({ type: "mobile", payload });
        return { message: "OTP Sent Successfully to your mobile" };
    }
    return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_USER_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
});
exports.forgotPassword = forgotPassword;
// @Desc    Reset Password (OTP and newPassword as input)
// @Access  Public
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { identity } = payload;
    // Check If valid email
    if ((0, index_1.isValidEmail)(identity)) {
        yield (0, helpers_1.verifyOTP)({ type: "email", payload });
        return { message: "Password reset successfully" };
    }
    // Check If valid mobile number
    if ((0, index_1.isValidMobile)(identity)) {
        yield (0, helpers_1.verifyOTP)({ type: "mobile", payload });
        return { message: "Password reset successfully" };
    }
    return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_USER_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
});
exports.resetPassword = resetPassword;
// @Desc    Get loggedin user profile
// @Access  Private
const getUserDetail = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId).select("-password");
    if (!user) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_USER_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        // @ts-ignore
        createdAt: user.createdAt,
        // @ts-ignore
        updatedAt: user.updatedAt,
    };
});
exports.getUserDetail = getUserDetail;
// @Desc    Convert a normal user to vendor
// @Access  Private
const convertToVendor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = payload;
    const user = yield User_1.default.findById(userId).select("-password");
    if (!user) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_USER_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Check if already vendor
    if (user.role === "vendor") {
        return (0, errorHandler_1.errorHandler)({
            message: "You are already a vendor",
            type: errorTypes_1.APOLLO_ERROR,
        });
    }
    // Send Email to admin for request
    yield (0, mail_1.vendorRequestEmail)({ title: payload.title, body: payload.body });
    return {
        message: "Your request is sent to admin. Please wait for admin approval.",
    };
});
exports.convertToVendor = convertToVendor;
//# sourceMappingURL=authController.js.map