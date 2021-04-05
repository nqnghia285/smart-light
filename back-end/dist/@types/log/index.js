"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function log(message, option) {
    if (option !== undefined) {
        console.log(message, option);
    }
    else {
        console.log(message);
    }
}
exports.default = log;
