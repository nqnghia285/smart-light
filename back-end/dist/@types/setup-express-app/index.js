"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.setup = void 0;
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
function setup(app, dirname, origin) {
    app.use(body_parser_1.json());
    app.use(body_parser_1.urlencoded({ extended: false }));
    app.use(cookie_parser_1.default());
    const config = {
        origin: origin,
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
        optionSuccessStatus: 200,
    };
    app.use(cors_1.default(config));
    app.use(express_1.default.static(path_1.default.join(dirname, "public")));
}
exports.setup = setup;
function route(app, path, route) {
    app.use(path, route);
}
exports.route = route;
