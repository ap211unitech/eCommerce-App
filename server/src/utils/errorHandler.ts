import {
  ApolloError,
  ValidationError,
  AuthenticationError,
} from "apollo-server-express";

type Payload = {
  message: string;
  code?: string;
  type: string;
};

export const errorHandler = (payload: Payload) => {
  const { message, code, type } = payload;

  switch (type) {
    case "ApolloError": {
      throw new ApolloError(message, code);
    }
    case "ValidationError": {
      throw new ValidationError(message);
    }
    case "AuthenticationError": {
      throw new AuthenticationError(message);
    }
    default:
      throw new ApolloError(message, code);
  }
};
