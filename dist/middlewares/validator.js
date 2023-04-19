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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validator = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        res.status(400).json({
            message: ((_a = error === null || error === void 0 ? void 0 : error.issues[0]) === null || _a === void 0 ? void 0 : _a.message) || 'Bad request! All field required!',
            success: false,
        });
    }
});
exports.validator = validator;
//# sourceMappingURL=validator.js.map