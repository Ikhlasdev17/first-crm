"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const linksController_1 = require("../controllers/linksController");
const authRequired_middleware_1 = require("../middlewares/authRequired.middleware");
const validator_1 = require("../middlewares/validator");
const LinksSchema_1 = require("../schemas/LinksSchema");
const router = express_1.default.Router();
router
    .get('/', authRequired_middleware_1.authRequired, linksController_1.LinkController.getAll)
    .post('/', authRequired_middleware_1.authRequired, (0, validator_1.validator)(LinksSchema_1.LinksSchema), linksController_1.LinkController.createLink);
exports.default = router;
//# sourceMappingURL=linksRoutes.js.map