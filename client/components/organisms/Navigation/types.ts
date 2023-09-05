export type CategoriesResponse = {
  categoryId: string;
  name: string;
  children: CategoriesResponse[];
};

export type UserRoles = "user" | "admin" | "vendor";

export type UserDetailResponse = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
};
