import { Document, Types } from "mongoose";

import { IProductSchema } from "../../models/Product";

// Check if filters/specifications are valid JSON
export const isValidJSON = (payload: string) => {
  try {
    if (payload.trim().length) {
      JSON.parse(payload);
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

// Returns response of GraphQL type Product
export const getResponse = (
  product: Omit<
    Document<unknown, {}, IProductSchema> &
      Omit<
        IProductSchema & {
          _id: Types.ObjectId;
        },
        never
      >,
    never
  >
) => {
  return {
    productId: product._id,
    category: {
      // @ts-ignore
      categoryId: product.categoryId._id,
      // @ts-ignore
      ...product.categoryId._doc,
    },
    name: product.name,
    slug: product.slug,
    description: product.description,
    gallery: product.gallery,
    variations: product.variations,
    specifications: product.specifications,
    filters: product.filters,
    price: product.price,
    avaliableQuantity: product.avaliableQuantity,
    discount: product.discount,
    rating: product.rating,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    createdBy: product.createdBy,
    updatedBy: product.updatedBy,
    // @ts-ignore
    createdAt: product.createdAt,
    // @ts-ignore
    updatedAt: product.updatedAt,
  };
};
