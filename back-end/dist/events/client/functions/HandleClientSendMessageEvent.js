"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClientSendMessageEvent = void 0;
const authentication_1 = require("../../../@types/authentication");
const log_1 = __importDefault(require("../../../@types/log"));
const interface_1 = require("../../../interface");
function handleClientSendMessageEvent(socket) {
    socket.on(interface_1.ClientEvent.CLIENT_SEND_MESSAGE, (message) => __awaiter(this, void 0, void 0, function* () {
        const req = socket.request;
        log_1.default("Cookies of client:", req.cookies);
        log_1.default("client-send-message:", message);
        log_1.default("Authenticate: ", authentication_1.authenticateUserFromReq(req));
    }));
}
exports.handleClientSendMessageEvent = handleClientSendMessageEvent;
