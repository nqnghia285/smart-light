import { Request, Response } from "express";
import { authenticateUserFromReq } from "../../../@types/authentication";
import { ControllerModel } from "../../../database/models";
import { ResponseType, RoleType, UserInfo } from "../../../interface";

export async function deleteController(req: Request, res: Response): Promise<void> {
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

            let controller = await ControllerModel.findByPk(req.body?.mcuId);
            if (controller !== null) {
                await controller
                    .destroy()
                    .then(() => {
                        response.isSuccess = true;
                        response.message = `Delete Controler has mcuId:${req.body?.mcuId} success`;
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "This Controller is not exist";
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
