export type CategoriesResponse = {
  categoryId: string;
  name: string;
  children: CategoriesResponse[];
};
