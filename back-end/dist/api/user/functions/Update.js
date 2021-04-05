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
exports.updateUser = void 0;
const sequelize_1 = require("sequelize");
const authentication_1 = require("../../../@types/authentication");
const bcrypt_1 = require("../../../@types/bcrypt");
const models_1 = require("../../../database/models");
const interface_1 = require("../../../interface");
function updateUser(req, res) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isValid: false,
            isSuccess: false,
            message: "",
        };
        const payload = authentication_1.authenticateUserFromReq(req);
        if (payload !== undefined) {
            const isProfile = (_a = req.body) === null || _a === void 0 ? void 0 : _a.isProfile;
            let user = { userId: payload.userId };
            let isPassed = false;
            if (payload.role === interface_1.RoleType.ADMIN) {
                response.isValid = true;
                if (isProfile) {
                    user = {
                        userId: 0,
                        fullName: "",
                        email: "",
                        role: "",
                    };
                    user.userId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.userId;
                    user.fullName = (_c = req.body) === null || _c === void 0 ? void 0 : _c.fullName;
                    user.email = (_d = req.body) === null || _d === void 0 ? void 0 : _d.email;
                    user.role = (_e = req.body) === null || _e === void 0 ? void 0 : _e.role;
                    let userExist = yield models_1.UserModel.findOne({
                        where: {
                            [sequelize_1.Op.and]: [{ userId: { [sequelize_1.Op.ne]: user.userId } }, { email: user.email }],
                        },
                    });
                    if (userExist === null)
                        isPassed = true;
                }
                else {
                    user = {
                        userId: 0,
                        password: "",
                    };
                    user.userId = (_f = req.body) === null || _f === void 0 ? void 0 : _f.userId;
                    user.password = bcrypt_1.hashPWD((_g = req.body) === null || _g === void 0 ? void 0 : _g.password);
                    isPassed = true;
                }
            }
            else if (payload.role === interface_1.RoleType.CUSTOMER && payload.userId === ((_h = req.body) === null || _h === void 0 ? void 0 : _h.userId)) {
                response.isValid = true;
                if (isProfile) {
                    user = {
                        userId: 0,
                        fullName: "",
                        email: "",
                    };
                    user.userId = (_j = req.body) === null || _j === void 0 ? void 0 : _j.userId;
                    user.fullName = (_k = req.body) === null || _k === void 0 ? void 0 : _k.fullName;
                    user.email = (_l = req.body) === null || _l === void 0 ? void 0 : _l.email;
                    let userExist = yield models_1.UserModel.findOne({
                        where: {
                            [sequelize_1.Op.and]: [{ userId: { [sequelize_1.Op.ne]: user.userId } }, { email: user.email }],
                        },
                    });
                    if (userExist === null)
                        isPassed = true;
                }
                else {
                    user = {
                        userId: 0,
                        password: "",
                    };
                    user.userId = (_m = req.body) === null || _m === void 0 ? void 0 : _m.userId;
                    user.password = bcrypt_1.hashPWD((_o = req.body) === null || _o === void 0 ? void 0 : _o.password);
                    isPassed = true;
                }
            }
            else {
                response.message = "This account does not have this permission";
            }
            if (isPassed) {
                let userDB = yield models_1.UserModel.findByPk(user.userId);
                if (userDB !== null) {
                    yield userDB
                        .update(user)
                        .then(() => {
                        response.isSuccess = true;
                        response.message = "Update User success";
                    })
                        .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
                }
                else {
                    response.message = "The user is not exist";
                }
            }
            else {
                response.message = `This email existed in database or this account does not have this permission`;
            }
        }
        else {
            response.message = "The user token is invalid";
        }
        res.json(response);
    });
}
exports.updateUser = updateUser;
