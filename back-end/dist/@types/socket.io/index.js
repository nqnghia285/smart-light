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
exports.createNamespace = exports.initIO = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const socket_io_cookie_parser_1 = __importStar(require("../socket.io-cookie-parser"));
const io = new socket_io_1.default.Server();
function initIO(server, origin) {
    io.attach(server, {
        cors: {
            origin: [origin],
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
            credentials: true,
        },
    });
    io.use(socket_io_cookie_parser_1.default());
    return io;
}
exports.initIO = initIO;
function createNamespace(nsp) {
    return io.of(nsp, socket_io_cookie_parser_1.parser());
}
exports.createNamespace = createNamespace;
exports.default = io;
