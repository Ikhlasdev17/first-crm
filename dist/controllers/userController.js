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
exports.UserController = void 0;
const User_1 = require("../entities/User");
const Links_1 = require("../entities/Links");
exports.UserController = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = User_1.User.createQueryBuilder();
            const page = parseInt(req.query.page) || 1;
            const per_page = parseInt(req.query.per_page) || 10;
            const total = yield builder.getCount();
            builder.offset((page - 1) * per_page).limit(per_page);
            const allUsers = yield builder.getMany();
            res.status(200).json({
                message: 'success',
                payload: {
                    data: allUsers,
                    pagination: {
                        page,
                        per_page,
                        last_page: Math.ceil(total / per_page),
                    },
                },
            });
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, phone, linkId, status, unical_id } = req.body;
            try {
                const currentLink = yield Links_1.Link.findOneBy({ id: linkId });
                const user = yield User_1.User.findOneBy({ unical_id });
                if (user) {
                    res.status(422).json({
                        message: 'user already exist!',
                    });
                }
                else {
                    if (currentLink) {
                        const newUser = new User_1.User();
                        newUser.phone = phone;
                        newUser.username = username;
                        newUser.link = currentLink;
                        newUser.status = status;
                        newUser.unical_id = unical_id;
                        const savedUser = yield newUser.save();
                        currentLink.price_for_single = Math.floor(currentLink.price / (currentLink.clicked + 1));
                        currentLink.clicked = currentLink.clicked + 1;
                        yield currentLink.save();
                        res.status(201).json({
                            message: 'success',
                            payload: savedUser,
                        });
                    }
                    else {
                        res.status(422).json({
                            message: 'Link is not defined!',
                        });
                    }
                }
            }
            catch (error) {
                res.status(422).json({
                    message: error.message,
                });
                console.log(error);
            }
        });
    },
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { phone, username, status, unical_id } = req.body;
                if (!id) {
                    res.status(422).json({
                        message: 'id is required',
                    });
                }
                const currentUser = yield User_1.User.findOneBy({ unical_id: id });
                if (!currentUser) {
                    res.status(404).json({
                        message: 'user is not defined!',
                    });
                }
                else {
                    currentUser.phone = phone || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.phone);
                    currentUser.username = username || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.username);
                    currentUser.status = status || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.status);
                    currentUser.unical_id = unical_id || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.unical_id);
                    yield currentUser.save();
                    res.status(200).json({
                        message: 'success',
                        payload: currentUser,
                    });
                }
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        });
    },
};
//# sourceMappingURL=userController.js.map