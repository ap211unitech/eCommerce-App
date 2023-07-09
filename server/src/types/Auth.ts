export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  mobile: string;
};

export type SignInPayload = {
  password: string;
  mobile?: string;
  email?: string;
};

export type ForgotPasswordPayload = {
  email: string;
  mobile: string;
};
