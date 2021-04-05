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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateController = void 0;
const sequelize_1 = require("sequelize");
const authentication_1 = require("../../../@types/authentication");
const models_1 = require("../../../database/models");
const interface_1 = require("../../../interface");
function updateController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = {
            isValid: false,
            isSuccess: false,
            message: "",
        };
        const payload = authentication_1.authenticateUserFromReq(req);
        if (payload !== undefined) {
            if (payload.role === interface_1.RoleType.ADMIN) {
                response.isValid = true;
                const controller = {
                    mcuId: 0,
                    code: "",
                    type: "",
                };
                getParams(controller, req);
                let controllerDB = yield models_1.ControllerModel.findByPk(controller.mcuId);
                if (controllerDB !== null) {
                    let controllerExist = yield models_1.ControllerModel.findOne({
                        where: { [sequelize_1.Op.and]: [{ mcuId: { [sequelize_1.Op.ne]: controller.mcuId } }, { code: controller.code }] },
                    });
                    if (controllerExist === null) {
                        yield controllerDB
                            .update(controller)
                            .then(() => {
                            response.isSuccess = true;
                            response.message = "Update Controller success";
                        })
                            .catch((err) => {
                            response.message = `Error: ${err.message}`;
                        });
                    }
                    else {
                        response.message = `This code:${controller.code} existed in database`;
                    }
                }
                else {
                    response.message = `This mcu_id:${controller.mcuId} does not exist in database`;
                }
            }
            else {
                response.message = "This account does not have this permission";
            }
        }
        else {
            response.message = "The user token is invalid";
        }
        res.json(response);
    });
}
exports.updateController = updateController;
function getParams(controller, req) {
    var _a, _b, _c;
    controller.mcuId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.mcuId;
    controller.code = (_b = req.body) === null || _b === void 0 ? void 0 : _b.code;
    controller.type = (_c = req.body) === null || _c === void 0 ? void 0 : _c.type;
}
