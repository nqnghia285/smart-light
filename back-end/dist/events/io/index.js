"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioListener = void 0;
const interface_1 = require("../../interface");
const HandleControllerConnectEvent_1 = require("./functions/HandleControllerConnectEvent");
const HandleDisconnect_1 = require("./functions/HandleDisconnect");
function ioListener(io) {
    io.on("connection", (socket) => {
        socket.emit(interface_1.ServerEvent.SERVER_SEND_ACK_CONNECTION, "Connected to server.");
        HandleControllerConnectEvent_1.handleControllerConnect(socket);
        HandleDisconnect_1.handleDisconnect(socket);
    });
}
exports.ioListener = ioListener;
