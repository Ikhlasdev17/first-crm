"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: 'username is required!',
        }),
        status: zod_1.z.enum(['clicked', 'called', 'completed'], {
            required_error: 'user status is required!',
        }),
        linkId: (0, zod_1.string)({
            required_error: 'link is required!',
        }),
        unical_id: (0, zod_1.string)({
            required_error: 'unical_id is required!',
        }),
    }),
});
//# sourceMappingURL=UserSchema.js.map