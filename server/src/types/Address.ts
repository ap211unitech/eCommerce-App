export type UserAddressPayload = {
  userName: string;
  mobile: string;
  pincode: string;
  state: string;
  address: string;
  locality: string;
  city: string;
  type: "home" | "office";
  isDefault: boolean;
};

export type EditUserAddressPayload = UserAddressPayload & { addressId: string };
