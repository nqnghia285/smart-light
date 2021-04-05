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
exports.updateScript = void 0;
const authentication_1 = require("../../../@types/authentication");
const models_1 = require("../../../database/models");
function updateScript(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isValid: false,
            isSuccess: false,
            message: "",
        };
        const payload = authentication_1.authenticateUserFromReq(req);
        if (payload !== undefined) {
            response.isValid = true;
            const script = {
                scriptId: 0,
                name: "",
                timeOn: "",
                timeOff: "",
            };
            getParams(script, req);
            let scriptDB = yield models_1.ScriptModel.findOne({ where: { scriptId: script.scriptId, userId: payload.userId } });
            if (scriptDB !== null) {
                yield scriptDB
                    .update(script)
                    .then(() => {
                    response.isSuccess = true;
                    response.message = "Update Script succes";
                })
                    .catch((err) => {
                    response.message = `Error: ${err.message}`;
                });
            }
            else {
                response.message = "This script does not exist in database";
            }
        }
        else {
            response.message = "The user token is invalid";
        }
        res.json(response);
    });
}
exports.updateScript = updateScript;
function getParams(script, req) {
    var _a, _b, _c, _d;
    script.scriptId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.scriptId;
    script.name = (_b = req.body) === null || _b === void 0 ? void 0 : _b.name;
    script.timeOn = (_c = req.body) === null || _c === void 0 ? void 0 : _c.timeOn;
    script.timeOff = (_d = req.body) === null || _d === void 0 ? void 0 : _d.timeOff;
}
