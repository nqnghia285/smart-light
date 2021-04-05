"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPWD = exports.comparePWD = void 0;
const bcrypt = require("bcrypt");
const log_1 = __importDefault(require("../log"));
function comparePWD(pwd, hash) {
    try {
        return bcrypt.compareSync(pwd, hash);
    }
    catch (error) {
        log_1.default(error);
        return false;
    }
}
exports.comparePWD = comparePWD;
function hashPWD(pwd, salt = bcrypt.genSaltSync()) {
    try {
        return bcrypt.hashSync(pwd, salt);
    }
    catch (error) {
        log_1.default(error);
        return undefined;
    }
}
exports.hashPWD = hashPWD;
