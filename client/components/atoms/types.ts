export type SignInWithGoogleResponse = {
  data?: {
    signInWithGoogle: {
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
