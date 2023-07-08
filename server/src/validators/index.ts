import { SignUpPayload } from "../types/User";

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
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      return "Email must be a valid email address";
    }
  }
  if (!password || password === "") {
    return "Please add all fields";
  } else if (password.length < 6) {
    return "Password must be length of greater than 6";
  }

  const regex = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
  if (!regex.test(mobile)) {
    return "Invalid mobile number";
  }
  return null;
};
