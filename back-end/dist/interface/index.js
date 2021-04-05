"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerEvent = exports.ClientEvent = exports.ServerEvent = exports.StatusType = exports.RoleType = void 0;
exports.RoleType = {
    CUSTOMER: "customer",
    ADMIN: "admin",
};
exports.StatusType = {
    ON: "on",
    OFF: "off",
};
exports.ServerEvent = {
    SERVER_SEND_ACK_CONNECTION: "server-send-ack-connection",
    SERVER_SEND_MESSAGE: "server-send-message",
    SERVER_SEND_ACK_CONTROLLER_CONNECT: "server-send-ack-controller-connect",
};
exports.ClientEvent = {
    CLIENT_SEND_MESSAGE: "client-send-message",
};
exports.ControllerEvent = {
    CONTROLLER_CONNECT: "controller-connect",
};
