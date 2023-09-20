export type CreateProductPayload = {
  categoryId: string;
  name: string;
  description: string;
  specifications: string; //  {string: string}
  gallery: string[];
  filters: string; // {string: string[]}
  variations: string[]; // List of products by same vendor/admin that are variations to this product
  price: number;
  avaliableQuantity: number;
  discount: number; // 0-100 % in number
};

export type DeleteProductPayload = {
  productId: string;
};
