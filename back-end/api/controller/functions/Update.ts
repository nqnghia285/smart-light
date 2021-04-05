import { Request, Response } from "express";
import { Op } from "sequelize";
import { authenticateUserFromReq } from "../../../@types/authentication";
import { ControllerModel } from "../../../database/models";
import { ControllerType, ResponseType, RoleType, UserInfo } from "../../../interface";

export async function updateController(req: Request, res: Response): Promise<void> {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        if (payload.role === RoleType.ADMIN) {
            response.isValid = true;
            // Declare object of model type
            const controller: ControllerType = {
                mcuId: 0,
                code: "",
                type: "",
            };
            getParams(controller, req);

            let controllerDB = await ControllerModel.findByPk(controller.mcuId);

            if (controllerDB !== null) {
                // Check code
                let controllerExist = await ControllerModel.findOne({
                    where: { [Op.and]: [{ mcuId: { [Op.ne]: controller.mcuId } }, { code: controller.code }] },
                });

                if (controllerExist === null) {
                    // Update instance into database
                    await controllerDB
                        .update(controller)
                        .then(() => {
                            response.isSuccess = true;
                            response.message = "Update Controller success";
                        })
                        .catch((err) => {
                            response.message = `Error: ${err.message}`;
                        });
                } else {
                    response.message = `This code:${controller.code} existed in database`;
                }
            } else {
                response.message = `This mcu_id:${controller.mcuId} does not exist in database`;
            }
        } else {
            response.message = "This account does not have this permission";
        }
    } else {
        response.message = "The user token is invalid";
    }

    // Response to client
    res.json(response);
}

function getParams(controller: ControllerType, req: Request): void {
    controller.mcuId = req.body?.mcuId;
    controller.code = req.body?.code;
    controller.type = req.body?.type;
}
