"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
const cookie_1 = require("../cookie");
function parser() {
    return function (socket) {
        const req = socket.request;
        const cookies = cookie_1.cookieParse(socket.request.headers.cookie);
        req.cookies = cookies;
    };
}
exports.parser = parser;
function socketIoCookieParser() {
    return function (socket, next) {
        const req = socket.request;
        const cookies = cookie_1.cookieParse(socket.request.headers.cookie);
        req.cookies = cookies;
        next();
    };
}
exports.default = socketIoCookieParser;
