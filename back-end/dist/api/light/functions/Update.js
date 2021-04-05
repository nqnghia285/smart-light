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
exports.updateLight = void 0;
const sequelize_1 = require("sequelize");
const authentication_1 = require("../../../@types/authentication");
const models_1 = require("../../../database/models");
function updateLight(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isValid: false,
            isSuccess: false,
            message: "",
        };
        const payload = authentication_1.authenticateUserFromReq(req);
        if (payload !== undefined) {
            response.isValid = true;
            const light = {
                lightId: 0,
                roomId: 0,
                name: "",
            };
            getParams(light, req);
            let lightDB = yield models_1.LightModel.findByPk(light.lightId);
            if (lightDB !== null) {
                let lightExist = yield models_1.LightModel.findOne({
                    where: { [sequelize_1.Op.and]: [{ roomId: light.roomId }, { lightId: { [sequelize_1.Op.ne]: light.lightId } }, { name: light.name }] },
                });
                if (lightExist === null) {
                    yield lightDB
                        .update(light)
                        .then(() => {
                        response.isSuccess = true;
                        response.message = "Update Light success";
                    })
                        .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
                }
                else {
                    response.message = `This room name:${light.name} existed in database`;
                }
            }
            else {
                response.message = `This lightId:${light.lightId} does not exist in database`;
            }
        }
        else {
            response.message = "The user token is invalid";
        }
        res.json(response);
    });
}
exports.updateLight = updateLight;
function getParams(light, req) {
    var _a, _b, _c;
    light.lightId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.lightId;
    light.roomId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.roomId;
    light.name = (_c = req.body) === null || _c === void 0 ? void 0 : _c.name;
}
