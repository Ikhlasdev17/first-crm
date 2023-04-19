"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLoginSchema = exports.EmployeeSchema = exports.EmployeeRolesEnum = exports.EmployeeRoles = void 0;
const ValidatorErrors_1 = require("../utils/ValidatorErrors");
const zod_1 = require("zod");
const { object, string } = zod_1.z;
var EmployeeRoles;
(function (EmployeeRoles) {
    EmployeeRoles["CEO"] = "ceo";
    EmployeeRoles["ADMIN"] = "admin";
    EmployeeRoles["TEACHER"] = "teacher";
})(EmployeeRoles = exports.EmployeeRoles || (exports.EmployeeRoles = {}));
exports.EmployeeRolesEnum = zod_1.z.nativeEnum(EmployeeRoles);
exports.EmployeeSchema = object({
    body: object({
        username: (0, ValidatorErrors_1.usernameRequired)(),
        phone: string({
            required_error: 'phone is required!',
        }),
        password: (0, ValidatorErrors_1.passRequired)(),
        role: (0, zod_1.nativeEnum)(EmployeeRoles, {
            errorMap: (issue, ctx) => {
                return {
                    message: 'Please select employee role, roles: ceo | admin | teacher',
                };
            },
        }),
    }),
});
exports.EmployeeLoginSchema = object({
    body: object({
        phone: (0, ValidatorErrors_1.requiredString)('phone is required!'),
        password: (0, ValidatorErrors_1.passRequired)(),
    }),
});
//# sourceMappingURL=EmployeeScema.js.map