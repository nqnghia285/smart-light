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
exports.initController = void 0;
const models_1 = require("../../database/models");
const Light_1 = require("../../database/models/Light");
const server_1 = require("../../server");
const dotenv_1 = require("../dotenv");
dotenv_1.dotenvConfig();
function initController() {
    return __awaiter(this, void 0, void 0, function* () {
        const attributes = ["roomId", "name"];
        const include = [{ model: Light_1.Light, as: "lights", attributes: ["lightId", "name"] }];
        yield models_1.RoomModel.findAll({ attributes: attributes, include: include })
            .then((roomList) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const rooms = [];
            roomList === null || roomList === void 0 ? void 0 : roomList.forEach((room) => {
                var _a;
                const lights = [];
                (_a = room === null || room === void 0 ? void 0 : room.lights) === null || _a === void 0 ? void 0 : _a.forEach((light) => {
                    lights.push({ lightId: light.lightId, name: light.name, status: false });
                });
                rooms.push({ roomId: room.roomId, name: room.name, lights: lights });
            });
            const controller = { status: false, mcuId: 1, code: process.env.CODE, rooms: rooms };
            server_1.app.locals.controller = controller;
            console.log("Init Controller: ", server_1.app.locals.controller);
            (_a = controller === null || controller === void 0 ? void 0 : controller.rooms) === null || _a === void 0 ? void 0 : _a.forEach((room) => {
                console.log("lights of room in controller: ", room === null || room === void 0 ? void 0 : room.lights);
            });
        }))
            .catch((err) => {
            console.log(`Error: ${err.message}`);
        });
    });
}
exports.initController = initController;
