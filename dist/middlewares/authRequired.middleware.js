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
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = req.headers.authorization;
    const token = (headers === null || headers === void 0 ? void 0 : headers.split(' ')[1]) || '';
    if (!headers) {
        res.status(401).json({
            message: 'unauthenticated!',
        });
    }
    else {
        const tokenVerify = jsonwebtoken_1.default.verify(token, 'secret first');
        if (!tokenVerify) {
            res.status(401).json({
                message: 'unauthenticated!',
            });
        }
        else {
            req.token = token;
            next();
        }
    }
});
exports.authRequired = authRequired;
//# sourceMappingURL=authRequired.middleware.js.map