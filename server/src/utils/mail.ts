import path from "path";

// Environmental Variables
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const API_KEY = process.env.SENDGRID_KEY || "";
const SENDER_EMAIL = process.env.SENDER_EMAIL || "";

import sgMail, { MailDataRequired } from "@sendgrid/mail";

import {
  sendEmailForOTPTemplate,
  sendEmailForRequestToBeVendor,
} from "./mailTemplate";

sgMail.setApiKey(API_KEY);

// Reset Password - Sends OTP to Email
export const forgotPasswordEmail = async ({
  to,
  otp,
}: {
  to: string;
  otp: string;
}) => {
  const message: MailDataRequired = {
    to: [to],
    from: {
      name: "eCommerce",
      email: SENDER_EMAIL,
    },
    subject: "Reset your password",
    html: sendEmailForOTPTemplate(otp),
  };
  try {
    await sgMail.send(message);
    console.log("OTP sent to email...");
  } catch (err) {
    console.log(err);
  }
};

// Request to be a vendor
export const vendorRequestEmail = async (payload: {
  title: string;
  body: string;
}) => {
  const message: MailDataRequired = {
    to: [SENDER_EMAIL],
    from: {
      name: "eCommerce",
      email: SENDER_EMAIL,
    },
    subject: "Someone wants to become a vendor",
    html: sendEmailForRequestToBeVendor(payload),
  };
  try {
    await sgMail.send(message);
    console.log("Email sent for request to be a vendor...");
  } catch (err) {
    console.log(err);
  }
};
