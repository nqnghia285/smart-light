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
exports.createRoom = void 0;
const authentication_1 = require("../../../@types/authentication");
const models_1 = require("../../../database/models");
const interface_1 = require("../../../interface");
function createRoom(req, res) {
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
                const room = {
                    name: "",
                };
                getParams(room, req);
                let roomNameExist = yield models_1.RoomModel.findOne({ where: { name: room.name } });
                if (roomNameExist === null) {
                    yield models_1.ControllerModel.findByPk(1)
                        .then((controller) => __awaiter(this, void 0, void 0, function* () {
                        yield (controller === null || controller === void 0 ? void 0 : controller.createRoom({ name: room.name }).then(() => {
                            response.isSuccess = true;
                            response.message = "Create Room success";
                        }).catch((err) => {
                            response.message = `Error: ${err.message}`;
                        }));
                    }))
                        .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
                }
                else {
                    response.message = "This room name existed in database";
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
exports.createRoom = createRoom;
function getParams(room, req) {
    var _a;
    room.name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
}
