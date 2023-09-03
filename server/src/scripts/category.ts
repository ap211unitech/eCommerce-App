const menData = {
  name: "Men",
  children: [
    {
      name: "Topwear",
      children: [
        { name: "T-Shirts" },
        { name: "Casual Shirts" },
        { name: "Formal Shirts" },
        { name: "Sweat Shirts" },
        { name: "Sweaters" },
        { name: "Jackets" },
        { name: "Blazer & Coats" },
        { name: "Suits" },
      ],
    },
    {
      name: "Bottomwear",
      children: [
        { name: "Jeans" },
        { name: "Casual Trousers" },
        { name: "Formal Trousers" },
        { name: "Shorts" },
        { name: "Track Pants & Joogers" },
      ],
    },
    {
      name: "Footwear",
      children: [
        { name: "Casual Shoes" },
        { name: "Formal Shoes" },
        { name: "Sport Shoes" },
        { name: "Sneakers" },
        { name: "Sandles & Floaters" },
      ],
    },
    {
      name: "Fashion Accessories",
      children: [
        { name: "Wallets" },
        { name: "Belts" },
        { name: "Trimmers" },
        { name: "Perfumes & Body Mists" },
        { name: "Caps & Hats" },
        { name: "Rings & Wristwear" },
      ],
    },
  ],
};

const womenData = {
  name: "Women",
  children: [
    {
      name: "Indian & Fusion Wear",
      children: [
        { name: "Kurtas & Suits" },
        { name: "Sarees" },
        { name: "Skirts & Palazzos" },
        { name: "Lehnga Cholis" },
        { name: "Duppatas & Shawls" },
        { name: "Jackets" },
      ],
    },
    {
      name: "Western Wear",
      children: [
        { name: "Dresses" },
        { name: "Tops" },
        { name: "TShirts" },
        { name: "Jeans" },
        { name: "Trousers & Capris" },
        { name: "Shorts & Skirts" },
        { name: "Jumpsuits" },
      ],
    },
    {
      name: "Footwear",
      children: [
        { name: "Casual Shoes" },
        { name: "Flats" },
        { name: "Heels" },
        { name: "Boots" },
        { name: "Sport Shoes & Floaters" },
      ],
    },
    {
      name: "Beauty & Personal Care",
      children: [
        { name: "Makeup" },
        { name: "Skincare" },
        { name: "Premium Beauty" },
        { name: "Lipsticks" },
        { name: "Fragrances" },
      ],
    },
  ],
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjI1MGU0NGVkMTEyMzAxYjNhZjgwOSIsImlhdCI6MTY5MzY2NzMxNywiZXhwIjoxNjkzNzUzNzE3fQ.wscM_kuE-cu2EVMlHLDG4oBck7llcUoRgkLUMWXrcsk";

export const addCategory = async (catData: any, parentId: string) => {
  const name = catData.name;
  const filters = catData.filters ? JSON.stringify(catData.filters) : "{}";

  const ADD_CATEGORIES = `mutation CreateCategory ($name: String!, $parentId: String, $filters: String) {
            createCategory(name: $name, parentId: $parentId, filters: $filters) {
                categoryId
                name
                parentId
                createdBy
                updatedBy
                createdAt
                updatedAt
                filter
            }
        }`;

  const res = await (
    await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: ADD_CATEGORIES,
        variables: {
          name,
          parentId,
          filters,
        },
      }),
    })
  ).json();

  console.log(res);

  if (catData.children) {
    for (let index = 0; index < catData.children?.length; index++) {
      const currData = catData.children[index];

      await addCategory(
        currData,
        res?.data?.createCategory?.categoryId?.toString()
      );
    }
  }
};

addCategory(womenData, "");
