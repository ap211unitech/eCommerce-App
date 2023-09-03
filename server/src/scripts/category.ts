const data = {
  name: "Men",
  children: [
    {
      name: "Topwear",
      filters: {
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
          "Light Blue",
          "Navy Blue",
          "Red",
          "Green",
          "Pink",
          "Black",
          "White",
          "Gray",
        ],
      },
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

addCategory(data, "");
