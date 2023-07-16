import {
  EditUserAddressPayload,
  UserAddressPayload,
} from "../../types/Address";
import { AuthID } from "../../types/Auth";

import { isValidMobile } from "../../validators";
import { errorHandler } from "../../utils/errorHandler";
import { APOLLO_ERROR, VALIDATION_ERROR } from "../../constants/errorTypes";
import {
  NO_SUCH_ADDRESS_EXISTS,
  UNAUTHORIZED_REQUEST,
} from "../../constants/error";

import Address from "../../models/Address";

// @Desc    Get list of addresses for loggedin user
// @Access  Private
export const getAddress = async ({ userId }: AuthID) => {
  const addresses = await Address.find({ userId });
  return addresses;
};

// @Desc    Add address through form data
// @Access  Private
export const addAddress = async (payload: UserAddressPayload & AuthID) => {
  const { mobile, isDefault, userId } = payload;

  // Check if mobile number is valid
  const isMobileValid = isValidMobile(mobile);
  if (!isMobileValid) {
    return errorHandler({
      message: "Invalid mobile number",
      type: VALIDATION_ERROR,
    });
  }

  // Find existing addresses
  const addresses = await Address.find({ userId });

  if (addresses.length > 0) {
    if (isDefault) {
      // Turn each address isDefault key to false
      addresses.forEach(async (address) => {
        address.isDefault = false;
        await address.save();
      });
      // Make current address as default address
      const newAddress = new Address({ ...payload, isDefault: true });
      await newAddress.save();
      return newAddress;
    } else {
      // Add address to schema
      const newAddress = new Address(payload);
      await newAddress.save();
      return newAddress;
    }
  }
  // Make current address as default address
  const newAddress = new Address({ ...payload, isDefault: true });
  await newAddress.save();
  return newAddress;
};

// @Desc    Edit address through form data for a user given addressId
// @Access  Private
export const editAddress = async (payload: EditUserAddressPayload & AuthID) => {
  const { addressId, userId, isDefault, mobile } = payload;

  // Check if mobile number is valid
  const isMobileValid = isValidMobile(mobile);
  if (!isMobileValid) {
    return errorHandler({
      message: "Invalid mobile number",
      type: VALIDATION_ERROR,
    });
  }

  // Find address for that addressId
  const findAddress = await Address.findById(addressId);
  if (!findAddress) {
    return errorHandler({ ...NO_SUCH_ADDRESS_EXISTS, type: APOLLO_ERROR });
  }

  // Check if address belongs to loggedin user
  if (findAddress.userId.toString() !== userId.toString()) {
    return errorHandler({ ...UNAUTHORIZED_REQUEST, type: APOLLO_ERROR });
  }

  if (isDefault) {
    const addresses = await Address.find({ userId });

    // Turn each address isDefault key to false
    addresses.forEach(async (address) => {
      address.isDefault = false;
      await address.save();
    });

    // Make current address as default address
    return await Address.findByIdAndUpdate(
      addressId,
      { $set: payload },
      { new: true }
    );
  } else {
    // If current isDefault is false
    return await Address.findByIdAndUpdate(
      addressId,
      { $set: payload },
      { new: true }
    );
  }
};
