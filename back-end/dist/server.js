"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const ip_1 = require("ip");
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("./@types/dotenv");
const log_1 = __importDefault(require("./@types/log"));
const setup_express_app_1 = require("./@types/setup-express-app");
const socket_io_1 = __importStar(require("./@types/socket.io"));
const api_1 = __importDefault(require("./api"));
const events_1 = require("./events");
dotenv_1.dotenvConfig();
const PORT = parseInt(process.env.PORT || "5000", 10);
const ORIGIN = process.env.ORIGIN || "*";
const HOST_NAME = process.env.HOST_NAME || "0.0.0.0";
const API_PATH = process.env.API_PATH || "/api";
exports.app = express_1.default();
const server = http.createServer(exports.app);
socket_io_1.initIO(server, ORIGIN);
const client = socket_io_1.createNamespace("/client");
events_1.ioHandler(socket_io_1.default);
events_1.clientHandler(client);
setup_express_app_1.setup(exports.app, __dirname, ORIGIN);
exports.app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/index.html"));
});
setup_express_app_1.route(exports.app, API_PATH, api_1.default);
server.listen(PORT, HOST_NAME, () => {
    let announcement = {
        server: server.address(),
        address: ip_1.address(),
        message: "Server is running!",
    };
    log_1.default(announcement);
});
