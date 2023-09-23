"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const lodash_1 = require("lodash");
const auth_1 = require("./auth");
const address_1 = require("./address");
const category_1 = require("./category");
const product_1 = require("./product");
exports.resolvers = (0, lodash_1.merge)(auth_1.userResolvers, address_1.addressResolvers, category_1.categoryResolvers, product_1.productResolvers);
//# sourceMappingURL=index.js.map