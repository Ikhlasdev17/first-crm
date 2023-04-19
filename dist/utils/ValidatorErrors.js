"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameRequired = exports.passRequired = exports.requiredString = void 0;
const zod_1 = require("zod");
const requiredString = (message) => {
    return zod_1.z.string({
        required_error: message,
    });
};
exports.requiredString = requiredString;
const passRequired = () => (0, exports.requiredString)('password is required!');
exports.passRequired = passRequired;
const usernameRequired = () => (0, exports.requiredString)('username is required!');
exports.usernameRequired = usernameRequired;
//# sourceMappingURL=ValidatorErrors.js.map