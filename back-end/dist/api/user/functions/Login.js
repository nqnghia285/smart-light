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
exports.login = void 0;
const authentication_1 = require("../../../@types/authentication");
const bcrypt_1 = require("../../../@types/bcrypt");
const models_1 = require("../../../database/models");
const Light_1 = require("../../../database/models/Light");
const AGE = 1 * 60 * 60 * 1000;
const DOMAIN = process.env.DOMAIN;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isUserExist: false,
            isSuccess: false,
            message: "",
        };
        const user = {
            email: "",
            password: "",
        };
        getParams(user, req);
        let userDB = yield models_1.UserModel.findOne({ where: { email: user.email } });
        if (userDB !== null) {
            response.isUserExist = true;
            if (bcrypt_1.comparePWD(user.password, userDB.password)) {
                if (userDB.info !== undefined) {
                    let userToken = authentication_1.createToken(userDB.info, { expiresIn: "1h" });
                    response.userId = userDB.userId;
                    response.fullName = userDB.fullName;
                    response.email = userDB.email;
                    response.role = userDB.role;
                    response.isSuccess = true;
                    response.message = "Login success!";
                    res.cookie("token", userToken, {
                        domain: DOMAIN,
                        maxAge: AGE,
                        secure: false,
                        httpOnly: true,
                    });
                    const attributes = ["roomId", "name"];
                    const include = [{ model: Light_1.Light, as: "lights", attributes: ["lightId", "name"] }];
                    yield models_1.RoomModel.findAll({ attributes: attributes, include: include })
                        .then((roomList) => {
                        response.roomList = roomList;
                    })
                        .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
                }
                else {
                    response.message = "Error generate JWT";
                }
            }
            else {
                response.message = "The username and password are not matched.";
            }
        }
        else {
            response.message = "user is not exist";
        }
        res.json(response);
    });
}
exports.login = login;
function getParams(user, req) {
    var _a, _b;
    user.email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
    user.password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
}
