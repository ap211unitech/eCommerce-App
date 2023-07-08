"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "/.env" });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const helmet_1 = __importDefault(require("helmet"));
const typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    hello: String
  }
`;
const resolvers = {
    Query: {
        hello: () => "Hello world!",
    },
};
const startApolloServer = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use((0, helmet_1.default)());
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
    });
    yield server.start();
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 8000;
    yield new Promise(() => app.listen({ port: PORT }, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)));
    return { server, app };
});
const app = (0, express_1.default)();
startApolloServer(app);
//# sourceMappingURL=server.js.map