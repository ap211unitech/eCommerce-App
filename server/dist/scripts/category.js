"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = void 0;
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
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjI1MGU0NGVkMTEyMzAxYjNhZjgwOSIsImlhdCI6MTY5MzY2NzMxNywiZXhwIjoxNjkzNzUzNzE3fQ.wscM_kuE-cu2EVMlHLDG4oBck7llcUoRgkLUMWXrcsk";
const addCategory = (catData, parentId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
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
    const res = yield (yield fetch("http://localhost:5000/graphql", {
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
    })).json();
    console.log(res);
    if (catData.children) {
        for (let index = 0; index < ((_a = catData.children) === null || _a === void 0 ? void 0 : _a.length); index++) {
            const currData = catData.children[index];
            yield (0, exports.addCategory)(currData, (_d = (_c = (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.createCategory) === null || _c === void 0 ? void 0 : _c.categoryId) === null || _d === void 0 ? void 0 : _d.toString());
        }
    }
});
exports.addCategory = addCategory;
(0, exports.addCategory)(womenData, "");
//# sourceMappingURL=category.js.map