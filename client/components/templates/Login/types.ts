export type SignInResponse = {
  data?: {
    signIn: {
      _id: string;
      name: string;
      email: string;
      mobile: string;
      role: "user" | "admin" | "vendor";
      token: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};
