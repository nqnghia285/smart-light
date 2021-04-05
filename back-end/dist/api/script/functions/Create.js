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
exports.createScript = void 0;
const authentication_1 = require("../../../@types/authentication");
const log_1 = __importDefault(require("../../../@types/log"));
const models_1 = require("../../../database/models");
const interface_1 = require("../../../interface");
function createScript(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isValid: false,
            isSuccess: false,
            message: "",
        };
        const payload = authentication_1.authenticateUserFromReq(req);
        if (payload !== undefined) {
            response.isValid = true;
            const script = {
                name: "",
                userId: 0,
                timeOn: "",
                timeOff: "",
            };
            script.userId = payload.userId;
            getParams(script, req);
            const statusLights = (_a = req.body) === null || _a === void 0 ? void 0 : _a.lights;
            log_1.default("lights: ", statusLights);
            yield models_1.ScriptModel.create(script)
                .then((scriptDB) => __awaiter(this, void 0, void 0, function* () {
                response.isSuccess = true;
                response.message = "Create Script success";
                if (statusLights !== undefined) {
                    for (const light of statusLights) {
                        let c = yield models_1.CaseModel.findOne({ where: { lightId: light.lightId, status: light.status ? interface_1.StatusType.ON : interface_1.StatusType.OFF } });
                        if (c !== null) {
                            yield scriptDB.addCase(c);
                        }
                    }
                }
            }))
                .catch((err) => {
                response.message = `Error: ${err.message}`;
            });
        }
        else {
            response.message = "The user token is invalid";
        }
        res.json(response);
    });
}
exports.createScript = createScript;
function getParams(script, req) {
    var _a, _b, _c;
    script.name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
    script.timeOn = (_b = req.body) === null || _b === void 0 ? void 0 : _b.timeOn;
    script.timeOff = (_c = req.body) === null || _c === void 0 ? void 0 : _c.timeOff;
}
