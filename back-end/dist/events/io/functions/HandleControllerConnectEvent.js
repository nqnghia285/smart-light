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
exports.handleControllerConnect = void 0;
const log_1 = __importDefault(require("../../../@types/log"));
const models_1 = require("../../../database/models");
const interface_1 = require("../../../interface");
function handleControllerConnect(socket) {
    socket.on(interface_1.ControllerEvent.CONTROLLER_CONNECT, (message) => __awaiter(this, void 0, void 0, function* () {
        const response = { isSuccess: false, rooms: [] };
        const code = message === null || message === void 0 ? void 0 : message.code;
        const include = [{ model: models_1.RoomModel, as: "rooms", attributes: ["roomId", "name"], include: [{ model: models_1.LightModel, as: "lights", attributes: ["lightId", "name"] }] }];
        yield models_1.ControllerModel.findOne({ where: { code: code }, include: include })
            .then((controller) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (controller !== null) {
                const rooms = [];
                (_a = controller.rooms) === null || _a === void 0 ? void 0 : _a.forEach((room) => {
                    var _a;
                    const lights = [];
                    (_a = room.lights) === null || _a === void 0 ? void 0 : _a.forEach((light) => {
                        lights.push({ lightId: light.lightId, name: light.name });
                    });
                    rooms.push({ roomId: room.roomId, name: room.name, lights: lights });
                });
                response.isSuccess = true;
                response.rooms = rooms;
            }
        }))
            .catch((err) => {
            log_1.default("Error: ", err.message);
        });
        socket.emit(interface_1.ServerEvent.SERVER_SEND_ACK_CONTROLLER_CONNECT, response);
    }));
}
exports.handleControllerConnect = handleControllerConnect;
