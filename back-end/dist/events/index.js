"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientHandler = exports.ioHandler = void 0;
const io_1 = require("./io");
const client_1 = require("./client");
function ioHandler(io) {
    io_1.ioListener(io);
}
exports.ioHandler = ioHandler;
function clientHandler(client) {
    client_1.clientListener(client);
}
exports.clientHandler = clientHandler;
