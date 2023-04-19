"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksSchema = void 0;
const zod_1 = require("zod");
exports.LinksSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'name is required!',
        }),
        price: (0, zod_1.number)({
            required_error: 'price is required!',
        }),
        type: (0, zod_1.string)(),
    }),
});
//# sourceMappingURL=LinksSchema.js.map