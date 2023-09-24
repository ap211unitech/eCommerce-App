"use server";

import { revalidateTag } from "next/cache";

export const handleRevalidateTag = (tags: string[]) => {
  tags.forEach((tag) => revalidateTag(tag));
};
