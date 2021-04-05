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
exports.UserModel = exports.ScriptModel = exports.RoomModel = exports.LightModel = exports.ControllerModel = exports.CaseModel = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = require("../@types/bcrypt");
const log_1 = __importDefault(require("../@types/log"));
const system_functions_1 = require("../@types/system-functions");
const interface_1 = require("../interface");
const connection_1 = require("./connection");
const Case_1 = require("./models/Case");
const Controller_1 = require("./models/Controller");
const Light_1 = require("./models/Light");
const Room_1 = require("./models/Room");
const Script_1 = require("./models/Script");
const User_1 = require("./models/User");
const templates_1 = require("./templates");
dotenv_1.default.config();
exports.CaseModel = Case_1.Case;
exports.ControllerModel = Controller_1.Controller;
exports.LightModel = Light_1.Light;
exports.RoomModel = Room_1.Room;
exports.ScriptModel = Script_1.Script;
exports.UserModel = User_1.User;
User_1.User.hasMany(Script_1.Script, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "userId", as: "scripts" });
Script_1.Script.belongsTo(User_1.User, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "userId" });
Controller_1.Controller.hasMany(User_1.User, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId", as: "users" });
User_1.User.belongsTo(Controller_1.Controller, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId" });
Script_1.Script.belongsToMany(Case_1.Case, { through: "Script_Case", as: "cases" });
Case_1.Case.belongsToMany(Script_1.Script, { through: "Script_Case", as: "scripts" });
Light_1.Light.hasMany(Case_1.Case, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "lightId", as: "cases" });
Case_1.Case.belongsTo(Case_1.Case, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "lightId" });
Controller_1.Controller.hasMany(Light_1.Light, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId", as: "lights" });
Light_1.Light.belongsTo(Controller_1.Controller, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId" });
Controller_1.Controller.hasMany(Room_1.Room, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId", as: "rooms" });
Room_1.Room.belongsTo(Controller_1.Controller, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId" });
Room_1.Room.hasMany(Light_1.Light, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "roomId", as: "lights" });
Light_1.Light.belongsTo(Room_1.Room, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "roomId" });
Light_1.Light.afterCreate((light, _options) => __awaiter(void 0, void 0, void 0, function* () {
    yield light.createCase({ status: interface_1.StatusType.ON });
    yield light.createCase({ status: interface_1.StatusType.OFF });
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const force = { force: process.env.ENV_NODE === "develop" };
    yield connection_1.sequelize
        .sync(force)
        .then(() => {
        log_1.default("Notice: ", "Database is synchronized!");
    })
        .catch((err) => {
        log_1.default("Sequelize sync: ", err);
    });
    yield Controller_1.Controller.create({
        code: process.env.CODE,
        type: process.env.TYPE,
    })
        .then((controller) => __awaiter(void 0, void 0, void 0, function* () {
        log_1.default("Notice: ", "Add controller success!");
        yield User_1.User.create({
            fullName: process.env.FULL_NAME,
            email: process.env.EMAIL,
            password: bcrypt_1.hashPWD(process.env.ACC_PWD),
            role: process.env.ROLE,
            mcuId: controller.mcuId,
        })
            .then(() => {
            log_1.default("Notice: ", "Add admin acconut success!");
        })
            .catch((err) => {
            log_1.default("Add admin acconut: ", err);
        });
    }))
        .catch((err) => {
        log_1.default("Add controller: ", err);
    });
    yield templates_1.createTemplates();
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield system_functions_1.initController();
    }), 5000);
}))();
