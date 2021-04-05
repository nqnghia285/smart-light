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
exports.createUser = void 0;
const authentication_1 = require("../../../@types/authentication");
const bcrypt_1 = require("../../../@types/bcrypt");
const models_1 = require("../../../database/models");
const interface_1 = require("../../../interface");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isValid: false,
            isSuccess: false,
            message: "",
        };
        const payload = authentication_1.authenticateUserFromReq(req);
        if (payload !== undefined) {
            if (payload.role === interface_1.RoleType.ADMIN) {
                response.isValid = true;
                const user = {
                    fullName: "",
                    email: "",
                    password: "",
                    role: "",
                };
                getParams(user, req);
                let userDB = yield models_1.UserModel.findOne({ where: { email: user.email } });
                if (userDB === null) {
                    yield models_1.ControllerModel.findOne({ where: { code: process.env.CODE } })
                        .then((controller) => __awaiter(this, void 0, void 0, function* () {
                        yield (controller === null || controller === void 0 ? void 0 : controller.createUser({ fullName: user.fullName, email: user.email, password: user.password, role: user.role }).then(() => {
                            response.isSuccess = true;
                            response.message = "Create User success";
                        }).catch((err) => {
                            response.message = `Error: ${err.message}`;
                        }));
                    }))
                        .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
                }
                else {
                    response.message = "This email existed in database";
                }
            }
            else {
                response.message = "This account does not have this permission";
            }
        }
        else {
            response.message = "The user token is invalid";
        }
        res.json(response);
    });
}
exports.createUser = createUser;
function getParams(user, req) {
    var _a, _b, _c, _d;
    user.fullName = (_a = req.body) === null || _a === void 0 ? void 0 : _a.fullName;
    user.email = (_b = req.body) === null || _b === void 0 ? void 0 : _b.email;
    user.password = bcrypt_1.hashPWD((_c = req.body) === null || _c === void 0 ? void 0 : _c.password);
    user.role = (_d = req.body) === null || _d === void 0 ? void 0 : _d.role;
}
