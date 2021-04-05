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
exports.updateRoom = void 0;
const sequelize_1 = require("sequelize");
const authentication_1 = require("../../../@types/authentication");
const models_1 = require("../../../database/models");
function updateRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isValid: false,
            isSuccess: false,
            message: "",
        };
        const payload = authentication_1.authenticateUserFromReq(req);
        if (payload !== undefined) {
            response.isValid = true;
            const room = {
                roomId: 0,
                name: "",
            };
            getParams(room, req);
            let roomDB = yield models_1.RoomModel.findByPk(room.roomId);
            if (roomDB !== null) {
                let roomExist = yield models_1.RoomModel.findOne({
                    where: { [sequelize_1.Op.and]: [{ roomId: { [sequelize_1.Op.ne]: room.roomId } }, { name: room.name }] },
                });
                if (roomExist === null) {
                    yield roomDB
                        .update(room)
                        .then(() => {
                        response.isSuccess = true;
                        response.message = "Update Room success";
                    })
                        .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
                }
                else {
                    response.message = `This room name:${room.name} existed in database`;
                }
            }
            else {
                response.message = `This roomId:${room.roomId} does not exist in database`;
            }
        }
        else {
            response.message = "The user token is invalid";
        }
        res.json(response);
    });
}
exports.updateRoom = updateRoom;
function getParams(room, req) {
    var _a, _b;
    room.roomId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.roomId;
    room.name = (_b = req.body) === null || _b === void 0 ? void 0 : _b.name;
}
