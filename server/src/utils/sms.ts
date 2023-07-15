// @ts-nocheck
import path from "path";

// Environmental Variables
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

import fast2sms from "fast-two-sms";

export const sendOTP = async ({
  OTP,
  mobile,
}: {
  OTP: string;
  mobile: string;
}) => {
  const API_KEY = process.env.FAST2SMSKEY;
  try {
    const response = await fast2sms.sendMessage({
      authorization: API_KEY,
      message: `OTP to reset password for eCommerce is: ${OTP}`,
      numbers: [mobile],
    });
    console.log(response);
  } catch (err) {
    throw new Error(err);
  }
};
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

sendOTP({ OTP: "4942", mobile: "9520515708" });
