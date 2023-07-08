export const userResolvers = {
  Query: {
    getAllUsers: () => {
      return {
        name: "Arjun",
        age: 21,
      };
    },
  },
};
