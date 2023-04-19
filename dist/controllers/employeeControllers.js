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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const Employees_1 = require("../entities/Employees");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.EmployeeController = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = Employees_1.Employee.createQueryBuilder('employee');
            const page = parseInt(req.query.page) || 1;
            const per_page = parseInt(req.query.per_page) || 10;
            const total = yield builder.getCount();
            builder.offset((page - 1) * per_page).limit(per_page);
            const allEmployees = yield (yield builder.getMany()).map(x => {
                const { password } = x, obj = __rest(x, ["password"]);
                return obj;
            });
            res.json({
                message: 'Success',
                payload: {
                    data: allEmployees,
                    pagination: {
                        page,
                        per_page,
                        last_page: Math.ceil(total / per_page),
                    },
                },
            });
        });
    },
    createEmployee(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.employeeData) === null || _a === void 0 ? void 0 : _a.id) {
                    res.status(422).json({
                        message: 'phone number already exist!',
                        success: false,
                    });
                    return;
                }
                const { username, phone, password, role } = req.body;
                const newUser = new Employees_1.Employee();
                const hashedPass = yield bcrypt_1.default.hash(password, 10);
                newUser.phone = phone;
                newUser.username = username;
                newUser.password = hashedPass;
                newUser.role = role || 'ceo';
                yield newUser
                    .save()
                    .then(r => {
                    const { password: pass } = newUser, data = __rest(newUser, ["password"]);
                    res.status(200).json({
                        message: 'success',
                        payload: data,
                    });
                })
                    .catch(err => {
                    res.status(400).json({ message: err.message });
                    console.log(err);
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json(error);
            }
        });
    },
    signIn(req, res) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phone, password } = req.body;
                const passwordIsMatch = yield bcrypt_1.default.compare(password, ((_a = req === null || req === void 0 ? void 0 : req.employeeData) === null || _a === void 0 ? void 0 : _a.password) || '');
                const token = jsonwebtoken_1.default.sign({ data: req.employeeData }, 'secret first');
                if (passwordIsMatch) {
                    res.status(200).json({
                        message: 'success',
                        payload: {
                            token,
                            phone: ((_b = req.employeeData) === null || _b === void 0 ? void 0 : _b.phone) || '',
                            username: ((_c = req.employeeData) === null || _c === void 0 ? void 0 : _c.username) || '',
                            id: ((_d = req.employeeData) === null || _d === void 0 ? void 0 : _d.id) || '',
                            role: ((_e = req.employeeData) === null || _e === void 0 ? void 0 : _e.role) || '',
                        },
                    });
                }
                else {
                    res.status(401).json({
                        message: 'Phone or password is incorrect!',
                    });
                }
            }
            catch (error) {
                res.status(400).json({
                    message: 'bad request!',
                });
            }
        });
    },
    getMe(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (req.token) {
                res.status(200).json({
                    message: 'success',
                    success: true,
                    payload: {
                        phone: (_a = req.employeeData) === null || _a === void 0 ? void 0 : _a.phone,
                        id: (_b = req.employeeData) === null || _b === void 0 ? void 0 : _b.id,
                        role: (_c = req.employeeData) === null || _c === void 0 ? void 0 : _c.role,
                        username: (_d = req.employeeData) === null || _d === void 0 ? void 0 : _d.username,
                    },
                });
            }
            else {
                res.status(401).json({
                    message: 'unauthenticated!',
                });
            }
        });
    },
};
//# sourceMappingURL=employeeControllers.js.map