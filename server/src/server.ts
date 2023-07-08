import * as dotenv from "dotenv";
import express, { Express } from "express";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import helmet from "helmet";

import { typeDefs, resolvers } from "./graphql";
import { dbConnect } from "./utils/connect";

dotenv.config({ path: __dirname + "/../.env" });

const startApolloServer = async (
  app: Express
): Promise<{
  server: ApolloServer<ExpressContext>;
  app: express.Express;
}> => {
  app.use(helmet());

  dbConnect();

  const server: ApolloServer<ExpressContext> = new ApolloServer({
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
