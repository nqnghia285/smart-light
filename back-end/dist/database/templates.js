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
exports.createTemplates = void 0;
const models_1 = require("./models");
function createTemplates() {
    return __awaiter(this, void 0, void 0, function* () {
        const rooms = [];
        for (let i = 0; i < 3; i++) {
            rooms.push({ name: "Room " + (i + 1) });
        }
        console.log("Rooms: ", rooms);
        const lights = [];
        for (let i = 0; i < 3; i++) {
            lights.push({ name: "Light " + (i + 1), mcuId: 1 });
        }
        console.log("Lights: ", lights);
        yield models_1.ControllerModel.findByPk(1, { include: [models_1.ControllerModel.associations.rooms, models_1.ControllerModel.associations.lights], rejectOnEmpty: true }).then((controller) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            for (const room of rooms) {
                yield (controller === null || controller === void 0 ? void 0 : controller.createRoom(room));
            }
            yield (controller === null || controller === void 0 ? void 0 : controller.reload());
            console.log("Rooms of controoler: ", controller === null || controller === void 0 ? void 0 : controller.rooms);
            (_a = controller === null || controller === void 0 ? void 0 : controller.rooms) === null || _a === void 0 ? void 0 : _a.forEach((room) => {
                lights.forEach((light) => __awaiter(this, void 0, void 0, function* () {
                    yield (room === null || room === void 0 ? void 0 : room.createLight(light));
                }));
            });
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield (controller === null || controller === void 0 ? void 0 : controller.reload());
                console.log("Lights of controller: ", controller.lights);
                yield models_1.ScriptModel.create({ name: "Script 1", userId: 1, timeOn: "18:30", timeOff: "23:00" }).then((script) => __awaiter(this, void 0, void 0, function* () {
                    yield script.addCase(1);
                    yield script.addCase(2);
                    yield script.addCase(3);
                    yield script.addCase(4);
                    console.log("Case of script: ", yield script.getCases());
                    yield models_1.ScriptModel.findByPk(1, { include: [models_1.ScriptModel.associations.cases], rejectOnEmpty: true }).then((script) => {
                        console.log("Cases: ", script.cases);
                    });
                }));
            }), 3000);
        }));
    });
}
exports.createTemplates = createTemplates;
