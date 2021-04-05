"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDisconnect = void 0;
const log_1 = __importDefault(require("../../../@types/log"));
function handleDisconnect(socket) {
    socket.on("disconnect", (message) => {
        log_1.default("disconnect: ", message);
        socket.disconnect(true);
    });
}
exports.handleDisconnect = handleDisconnect;
