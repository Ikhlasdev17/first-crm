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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
const routes_1 = require("./routes");
const typeorm_pagination_1 = require("typeorm-pagination");
dotenv_1.default.config();
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.AppDataSource.initialize()
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        app.use(express_1.default.json());
        app.use(typeorm_pagination_1.pagination);
        app.use((0, cors_1.default)());
        app.use('/api/employee', routes_1.routes.employeeRoutes);
        app.use('/api/link', routes_1.routes.linkRoutes);
        app.use('/api/users', routes_1.routes.userRoutes);
        console.log('Database connected successful!');
        app.listen(5000, () => {
            console.log('Server started been on port 5000');
        });
    }))
        .catch(err => {
        console.log(err.message);
    });
});
main();
//# sourceMappingURL=index.js.map