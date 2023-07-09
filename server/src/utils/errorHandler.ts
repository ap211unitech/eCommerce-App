import {
  ApolloError,
  ValidationError,
  AuthenticationError,
} from "apollo-server-express";

import {
  APOLLO_ERROR,
  VALIDATION_ERROR,
  AUTHENTICATION_ERROR,
} from "../constants/errorTypes";

type Payload = {
  message: string;
  code?: string;
  type: string;
};

export const errorHandler = (payload: Payload) => {
  const { message, code, type } = payload;

  switch (type) {
    case APOLLO_ERROR: {
      throw new ApolloError(message, code);
    }
    case VALIDATION_ERROR: {
      throw new ValidationError(message);
    }
    case AUTHENTICATION_ERROR: {
      throw new AuthenticationError(message);
    }
    default:
      throw new ApolloError(message, code);
  }
};
