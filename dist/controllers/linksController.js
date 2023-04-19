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
exports.LinkController = void 0;
const Links_1 = require("../entities/Links");
exports.LinkController = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = Links_1.Link.createQueryBuilder();
            const page = parseInt(req.query.page) || 1;
            const per_page = parseInt(req.query.per_page) || 10;
            const total = yield builder.getCount();
            builder.offset((page - 1) * per_page).limit(per_page);
            const allLinks = yield builder.getMany();
            res.status(200).json({
                message: 'success',
                payload: {
                    data: allLinks,
                    pagination: {
                        page,
                        per_page,
                        last_page: Math.ceil(total / per_page),
                    },
                },
            });
        });
    },
    createLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, type } = req.body;
                const newLink = new Links_1.Link();
                (newLink.type = type), (newLink.name = name), (newLink.price = price);
                const newLinkSaved = yield newLink.save();
                res.status(201).json({
                    message: 'success',
                    payload: newLinkSaved,
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        });
    },
};
//# sourceMappingURL=linksController.js.map