"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const light_1 = __importDefault(require("./light"));
const room_1 = __importDefault(require("./room"));
const script_1 = __importDefault(require("./script"));
const user_1 = __importDefault(require("./user"));
const RootRoute = express_1.Router();
RootRoute.use("/user", user_1.default);
RootRoute.use("/controller", controller_1.default);
RootRoute.use("/script", script_1.default);
RootRoute.use("/room", room_1.default);
RootRoute.use("/light", light_1.default);
exports.default = RootRoute;
