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
exports.createLight = void 0;
const sequelize_1 = require("sequelize");
const authentication_1 = require("../../../@types/authentication");
const models_1 = require("../../../database/models");
const interface_1 = require("../../../interface");
function createLight(req, res) {
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
                const light = {
                    name: "",
                    roomId: 0,
                };
                getParams(light, req);
                let lightNameExist = yield models_1.LightModel.findOne({
                    where: {
                        [sequelize_1.Op.and]: [{ roomId: light.roomId }, { name: light.name }],
                    },
                });
                if (lightNameExist === null) {
                    yield models_1.RoomModel.findByPk(light.roomId)
                        .then((room) => __awaiter(this, void 0, void 0, function* () {
                        yield (room === null || room === void 0 ? void 0 : room.createLight({ name: light.name }).then(() => {
                            response.isSuccess = true;
                            response.message = "Create Light success";
                        }).catch((err) => {
                            response.message = `Error: ${err.message}`;
                        }));
                    }))
                        .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
                }
                else {
                    response.message = "This light name existed in database";
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
exports.createLight = createLight;
function getParams(light, req) {
    var _a, _b;
    light.name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
    light.roomId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.roomId;
}
