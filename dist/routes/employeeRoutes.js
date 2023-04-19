"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeControllers_1 = require("../controllers/employeeControllers");
const validator_1 = require("../middlewares/validator");
const EmployeeScema_1 = require("../schemas/EmployeeScema");
const checkEmployee_middleware_1 = require("../middlewares/checkEmployee.middleware");
const authRequired_middleware_1 = require("../middlewares/authRequired.middleware");
const router = express_1.default.Router();
router
    .get('/', authRequired_middleware_1.authRequired, employeeControllers_1.EmployeeController.getAll)
    .post('/', checkEmployee_middleware_1.checkEmployee, (0, validator_1.validator)(EmployeeScema_1.EmployeeSchema), employeeControllers_1.EmployeeController.createEmployee)
    .post('/signIn', (0, validator_1.validator)(EmployeeScema_1.EmployeeLoginSchema), checkEmployee_middleware_1.checkEmployee, employeeControllers_1.EmployeeController.signIn)
    .get('/getMe', authRequired_middleware_1.authRequired, checkEmployee_middleware_1.checkEmployee, employeeControllers_1.EmployeeController.getMe);
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map