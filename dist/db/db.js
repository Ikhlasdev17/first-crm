"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Courses_1 = require("../entities/Courses");
const Links_1 = require("../entities/Links");
const Employees_1 = require("../entities/Employees");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '6875',
    database: process.env.DB_NAME || 'learn',
    entities: [User_1.User, Courses_1.Course, Links_1.Link, Employees_1.Employee],
    synchronize: true,
});
//# sourceMappingURL=db.js.map