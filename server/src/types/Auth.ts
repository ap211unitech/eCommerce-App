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

export type SignInWithGooglePayload = {
  token: string;
};

export type ForgotPasswordPayload = {
  identity: string;
};

export type ResetPasswordPayload = {
  identity: string;
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
