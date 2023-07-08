import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

import express, { Express } from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const startApolloServer = async (app: Express) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 8000;
  await new Promise(() =>
    app.listen({ port: PORT }, () =>
      console.log(
        `Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    )
  );
  return { server, app };
};

const app: Express = express();
startApolloServer(app);
