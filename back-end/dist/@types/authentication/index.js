"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserFromReq = exports.createToken = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const log_1 = __importDefault(require("../log"));
const jwtKey = process.env.JWT_KEY || "jwt-key-dev";
function authenticateUser(token) {
    try {
        const obj = jsonwebtoken_1.default.verify(token, jwtKey);
        const payload = obj;
        return payload;
    }
    catch (error) {
        log_1.default(error);
        return undefined;
    }
}
exports.authenticateUser = authenticateUser;
function createToken(payload, option) {
    try {
        return jsonwebtoken_1.default.sign(payload, jwtKey, option);
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}
exports.createToken = createToken;
function authenticateUserFromReq(req) {
    var _a;
    let userToken = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (userToken !== undefined) {
        if (userToken.startsWith("Bearer ")) {
            userToken = userToken.slice(7, userToken.length);
        }
        return authenticateUser(userToken);
    }
    else {
        return undefined;
    }
}
exports.authenticateUserFromReq = authenticateUserFromReq;
