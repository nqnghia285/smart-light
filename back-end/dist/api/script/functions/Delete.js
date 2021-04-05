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
exports.deleteScript = void 0;
const authentication_1 = require("../../../@types/authentication");
const models_1 = require("../../../database/models");
const interface_1 = require("../../../interface");
function deleteScript(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isValid: false,
            isSuccess: false,
            message: "",
        };
        const payload = authentication_1.authenticateUserFromReq(req);
        if (payload !== undefined) {
            if (payload.role === interface_1.RoleType.ADMIN || payload.role === interface_1.RoleType.CUSTOMER) {
                response.isValid = true;
                let script = yield models_1.ScriptModel.findByPk((_a = req.body) === null || _a === void 0 ? void 0 : _a.scriptId);
                if (script !== null) {
                    yield script
                        .destroy()
                        .then(() => {
                        var _a;
                        response.isSuccess = true;
                        response.message = `Delete Script has scriptId:${(_a = req.body) === null || _a === void 0 ? void 0 : _a.scriptId} success`;
                    })
                        .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
                }
                else {
                    response.message = "This User is not exist";
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
exports.deleteScript = deleteScript;
