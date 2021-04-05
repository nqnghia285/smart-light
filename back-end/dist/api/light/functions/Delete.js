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
exports.deleteLight = void 0;
const authentication_1 = require("../../../@types/authentication");
const models_1 = require("../../../database/models");
const interface_1 = require("../../../interface");
function deleteLight(req, res) {
    var _a;
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
                let light = yield models_1.LightModel.findByPk((_a = req.body) === null || _a === void 0 ? void 0 : _a.lightId);
                if (light !== null) {
                    yield light
                        .destroy()
                        .then(() => {
                        var _a;
                        response.isSuccess = true;
                        response.message = `Delete Light has lightId:${(_a = req.body) === null || _a === void 0 ? void 0 : _a.lightId} success`;
                    })
                        .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
                }
                else {
                    response.message = "This Light is not exist";
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
exports.deleteLight = deleteLight;
