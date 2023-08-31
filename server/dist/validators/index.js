"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.isValidMobile = exports.isValidEmail = exports.validateSignUpInput = void 0;
const validateSignUpInput = ({ email, name, password, mobile, }) => {
    if (!name || name.trim() === "") {
        return "Please add all fields";
    }
    if (!email || email.trim() === "") {
        return "Please add all fields";
    }
    else if (!(0, exports.isValidEmail)(email)) {
        return "Invalid email address";
    }
    if (!password || password === "") {
        return "Please add all fields";
    }
    else if (password.length < 6) {
        return "Password must be length of greater than 6";
    }
    if (!(0, exports.isValidMobile)(mobile)) {
        return "Invalid mobile number";
    }
    return null;
};
exports.validateSignUpInput = validateSignUpInput;
const isValidEmail = (email) => {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    return email.match(regEx);
};
exports.isValidEmail = isValidEmail;
const isValidMobile = (mobile) => {
    const regex = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
    return regex.test(mobile);
};
exports.isValidMobile = isValidMobile;
const validatePassword = (password) => {
    if (!password || password === "") {
        return "Password can not be empty";
    }
    else if (password.length < 6) {
        return "Password must be length of greater than 6";
    }
    return null;
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=index.js.map