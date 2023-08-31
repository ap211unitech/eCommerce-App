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
exports.deleteAddress = exports.editAddress = exports.addAddress = exports.getAddress = void 0;
const validators_1 = require("../../validators");
const errorHandler_1 = require("../../utils/errorHandler");
const errorTypes_1 = require("../../constants/errorTypes");
const error_1 = require("../../constants/error");
const Address_1 = __importDefault(require("../../models/Address"));
// @Desc    Get list of addresses for loggedin user
// @Access  Private
const getAddress = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const addresses = yield Address_1.default.find({ user: userId });
    return addresses;
});
exports.getAddress = getAddress;
// @Desc    Add address through form data
// @Access  Private
const addAddress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile, isDefault, userId } = payload;
    // Check if mobile number is valid
    const isMobileValid = (0, validators_1.isValidMobile)(mobile);
    if (!isMobileValid) {
        return (0, errorHandler_1.errorHandler)({
            message: "Invalid mobile number",
            type: errorTypes_1.VALIDATION_ERROR,
        });
    }
    // Find existing addresses
    const addresses = yield Address_1.default.find({ user: userId });
    if (addresses.length > 0) {
        if (isDefault) {
            // Turn each address isDefault key to false
            addresses.forEach((address) => __awaiter(void 0, void 0, void 0, function* () {
                address.isDefault = false;
                yield address.save();
            }));
            // Make current address as default address
            const newAddress = new Address_1.default(Object.assign(Object.assign({}, payload), { user: userId, isDefault: true }));
            yield newAddress.save();
            return newAddress;
        }
        else {
            // Add address to schema
            const newAddress = new Address_1.default(Object.assign(Object.assign({}, payload), { user: userId }));
            yield newAddress.save();
            return newAddress;
        }
    }
    // Make current address as default address
    const newAddress = new Address_1.default(Object.assign(Object.assign({}, payload), { user: userId, isDefault: true }));
    yield newAddress.save();
    return newAddress;
});
exports.addAddress = addAddress;
// @Desc    Edit address through form data for a user given addressId
// @Access  Private
const editAddress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { addressId, userId, isDefault, mobile } = payload;
    // Check if mobile number is valid
    const isMobileValid = (0, validators_1.isValidMobile)(mobile);
    if (!isMobileValid) {
        return (0, errorHandler_1.errorHandler)({
            message: "Invalid mobile number",
            type: errorTypes_1.VALIDATION_ERROR,
        });
    }
    // Find address for that addressId
    const findAddress = yield Address_1.default.findById(addressId);
    if (!findAddress) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_ADDRESS_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Check if address belongs to loggedin user
    if (findAddress.user.toString() !== userId.toString()) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.UNAUTHORIZED_REQUEST), { type: errorTypes_1.APOLLO_ERROR }));
    }
    if (isDefault) {
        const addresses = yield Address_1.default.find({ user: userId });
        // Turn each address isDefault key to false
        addresses.forEach((address) => __awaiter(void 0, void 0, void 0, function* () {
            address.isDefault = false;
            yield address.save();
        }));
        // Make current address as default address
        return yield Address_1.default.findByIdAndUpdate(addressId, { $set: payload }, { new: true });
    }
    else {
        // If current isDefault is false
        return yield Address_1.default.findByIdAndUpdate(addressId, { $set: payload }, { new: true });
    }
});
exports.editAddress = editAddress;
// @Desc    Delete address for a user given addressId
// @Access  Private
const deleteAddress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { addressId, userId } = payload;
    // Find address for that addressId
    const findAddress = yield Address_1.default.findById(addressId);
    if (!findAddress) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.NO_SUCH_ADDRESS_EXISTS), { type: errorTypes_1.APOLLO_ERROR }));
    }
    // Check if address belongs to loggedin user
    if (findAddress.user.toString() !== userId.toString()) {
        return (0, errorHandler_1.errorHandler)(Object.assign(Object.assign({}, error_1.UNAUTHORIZED_REQUEST), { type: errorTypes_1.APOLLO_ERROR }));
    }
    yield Address_1.default.findByIdAndDelete(addressId);
    return { message: "Address deleted" };
});
exports.deleteAddress = deleteAddress;
//# sourceMappingURL=addressController.js.map