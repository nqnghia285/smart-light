"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientListener = void 0;
const interface_1 = require("../../interface");
const HandleClientSendMessageEvent_1 = require("./functions/HandleClientSendMessageEvent");
function clientListener(client) {
    client.on("connection", (socket) => {
        socket.emit(interface_1.ServerEvent.SERVER_SEND_ACK_CONNECTION, "Connected to server.");
        HandleClientSendMessageEvent_1.handleClientSendMessageEvent(socket);
    });
}
exports.clientListener = clientListener;
