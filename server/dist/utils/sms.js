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
exports.sendOTP = void 0;
// @ts-nocheck
const path_1 = __importDefault(require("path"));
// Environmental Variables
require("dotenv").config({ path: path_1.default.resolve(__dirname, "../../.env") });
const fast_two_sms_1 = __importDefault(require("fast-two-sms"));
const sendOTP = ({ OTP, mobile, }) => __awaiter(void 0, void 0, void 0, function* () {
    const API_KEY = process.env.FAST2SMSKEY;
    try {
        const response = yield fast_two_sms_1.default.sendMessage({
            authorization: API_KEY,
            message: `OTP to reset password for eCommerce is: ${OTP}`,
            numbers: [mobile],
        });
        console.log(response);
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.sendOTP = sendOTP;
// const sid = "AC14a9747aedf65103f48c9405786f098b";
// const authToken = "47d6866803afcf7fcca5001b5fddd474";
// import twilio from "twilio";
// export const senTwiliOTP = async ({ OTP, mobile }) => {
//   const t = twilio(sid, authToken);
//   try {
//     const res = await t.messages.create({
//       from: "+12345162707",
//       to: mobile,
//       body: `OTP to reset password for eCommerce is: ${OTP}`,
//     });
//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
// };
(0, exports.sendOTP)({ OTP: "4942", mobile: "9520515708" });
//# sourceMappingURL=sms.js.map