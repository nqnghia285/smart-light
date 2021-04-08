import { authenticateUserFromReq } from "../../../@types/authenticate-user";
import { Request, Response } from "express";
import { LightModel } from "../../../database/models";
import { ResponseType, RoleType, UserInfo } from "../../../interface";

export async function deleteLight(req: Request, res: Response): Promise<void> {
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

            let light = await LightModel.findByPk(req.body?.lightId);
            if (light !== null) {
                await light
                    .destroy()
                    .then(() => {
                        response.isSuccess = true;
                        response.message = `Delete Light has lightId:${req.body?.lightId} success`;
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "This Light is not exist";
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
