import slugIt from "slugify";

export const slugify = (data: string[]) => {
  const payload = data.join(" ");
  const slug = slugIt(payload, {
    replacement: "",
    lower: true,
  });
  return slug;
};
