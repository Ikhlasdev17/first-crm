"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const employeeRoutes_1 = __importDefault(require("./employeeRoutes"));
const linksRoutes_1 = __importDefault(require("./linksRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
exports.routes = {
    employeeRoutes: employeeRoutes_1.default,
    linkRoutes: linksRoutes_1.default,
    userRoutes: userRoutes_1.default,
};
//# sourceMappingURL=index.js.map