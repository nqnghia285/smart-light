import { Request, Response } from "express";
import { authenticateUserFromReq } from "../../../@types/authenticate-user";
import { ControllerModel } from "../../../database/models";
import { ControllerType, ResponseType, RoleType, UserInfo } from "../../../interface";

export async function createController(req: Request, res: Response): Promise<void> {
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
                code: "",
                type: "",
            };
            getParams(controller, req);

            // Check code
            let controllerDB = await ControllerModel.findOne({ where: { code: controller.code } });

            if (controllerDB === null) {
                // Insert new instance into database
                await ControllerModel.create(controller)
                    .then(() => {
                        response.isSuccess = true;
                        response.message = "Create Controller success";
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "This code existed in database";
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
    controller.code = req.body?.code;
    controller.type = req.body?.type;
}
