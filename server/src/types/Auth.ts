export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  mobile: string;
};

export type SignInPayload = {
  password: string;
  identity: string;
};

export type ForgotPasswordPayload = {
  email: string;
  mobile: string;
};

export type ResetPasswordPayload = {
  email: string;
  mobile: string;
  otp: string;
  newPassword: string;
};

export type ConvertToVendorPayload = {
  title: string;
  body: string;
};

export type AuthID = {
  userId: string;
};
