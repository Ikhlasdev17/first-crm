"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRequired_middleware_1 = require("../middlewares/authRequired.middleware");
const userController_1 = require("../controllers/userController");
const validator_1 = require("../middlewares/validator");
const UserSchema_1 = require("../schemas/UserSchema");
const router = express_1.default.Router();
router
    .get('/', authRequired_middleware_1.authRequired, userController_1.UserController.getAll)
    .post('/', (0, validator_1.validator)(UserSchema_1.UserSchema), userController_1.UserController.createUser)
    .patch('/:id', userController_1.UserController.updateUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map