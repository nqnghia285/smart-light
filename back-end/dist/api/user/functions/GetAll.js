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
exports.getAllUser = void 0;
const authentication_1 = require("../../../@types/authentication");
const models_1 = require("../../../database/models");
const Controller_1 = require("../../../database/models/Controller");
const interface_1 = require("../../../interface");
function getAllUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isValid: false,
            isSuccess: false,
            message: "",
            users: [],
        };
        const payload = authentication_1.authenticateUserFromReq(req);
        if (payload !== undefined) {
            if (payload.role === interface_1.RoleType.ADMIN) {
                response.isValid = true;
                const attributes = ["userId", "fullName", "email", "role", "createAt", "updateAt"];
                const include = [{ model: Controller_1.Controller }];
                yield models_1.UserModel.findAll({ attributes: attributes, include: include })
                    .then((users) => {
                    response.isSuccess = true;
                    response.message = "Get all user success";
                    response.users = users;
                })
                    .catch((err) => {
                    response.message = `Error: ${err.message}`;
                });
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
exports.getAllUser = getAllUser;
