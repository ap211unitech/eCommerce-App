export type CreateCategoryPayload = {
  name: string;
  parentId?: string;
  filters: string;
};

export type EditCategoryPayload = {
  categoryId: string;
} & CreateCategoryPayload;
