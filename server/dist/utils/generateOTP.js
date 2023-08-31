"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = () => {
    const digits = "0123456789";
    const otpLength = 4;
    let otp = "";
    for (let i = 1; i <= otpLength; i++) {
        const index = Math.floor(Math.random() * digits.length);
        otp = otp + digits[index];
    }
    return otp;
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=generateOTP.js.map