"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieSerialize = exports.cookieParse = void 0;
const cookie_1 = __importDefault(require("cookie"));
function cookieParse(str, option) {
    if (str !== undefined) {
        return cookie_1.default.parse(str, option);
    }
    else {
        return undefined;
    }
}
exports.cookieParse = cookieParse;
function cookieSerialize(name, value, option) {
    if (name !== undefined && value !== undefined) {
        return cookie_1.default.serialize(name, value, option);
    }
    else {
        return undefined;
    }
}
exports.cookieSerialize = cookieSerialize;
