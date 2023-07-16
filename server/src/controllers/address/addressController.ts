import { UserAddressPayload } from "../../types/Address";
import { AuthID } from "../../types/Auth";

import { isValidMobile } from "../../validators";
import { errorHandler } from "../../utils/errorHandler";
import { APOLLO_ERROR, VALIDATION_ERROR } from "../../constants/errorTypes";

import Address from "../../models/Address";

// @Desc    Add address through form data
// @Access  Private
export const addAddress = async (payload: UserAddressPayload & AuthID) => {
  const { mobile, isDefault, userId } = payload;

  // Check if mobile number is valid
  const isMobileValid = isValidMobile(mobile);
  if (!isMobileValid) {
    console.log("Coming j");
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
