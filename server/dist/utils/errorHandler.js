"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const errorTypes_1 = require("../constants/errorTypes");
const errorHandler = (payload) => {
    const { message, code, type } = payload;
    switch (type) {
        case errorTypes_1.APOLLO_ERROR: {
            throw new apollo_server_express_1.ApolloError(message, code);
        }
        case errorTypes_1.VALIDATION_ERROR: {
            throw new apollo_server_express_1.ValidationError(message);
        }
        case errorTypes_1.AUTHENTICATION_ERROR: {
            throw new apollo_server_express_1.AuthenticationError(message);
        }
        default:
            throw new apollo_server_express_1.ApolloError(message, code);
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map