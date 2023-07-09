import { SignUpPayload } from "../types/Auth";

export const validateSignUpInput = ({
  email,
  name,
  password,
  mobile,
}: SignUpPayload): string | null => {
  if (!name || name.trim() === "") {
    return "Please add all fields";
  }
  if (!email || email.trim() === "") {
    return "Please add all fields";
  } else if (!isValidEmail(email)) {
    return "Invalid email address";
  }
  if (!password || password === "") {
    return "Please add all fields";
  } else if (password.length < 6) {
    return "Password must be length of greater than 6";
  }

  if (!isValidMobile(mobile)) {
    return "Invalid mobile number";
  }
  return null;
};

export const isValidEmail = (email: string) => {
  const regEx =
    /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  return email.match(regEx);
};

export const isValidMobile = (mobile: string) => {
  const regex = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
  return regex.test(mobile);
};
