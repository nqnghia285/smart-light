import { Request, Response } from "express";
import { authenticateUserFromReq } from "../../../@types/authentication";
import { ScriptModel } from "../../../database/models";
import { ResponseType, RoleType, UserInfo } from "../../../interface";

export async function deleteScript(req: Request, res: Response): Promise<void> {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        if (payload.role === RoleType.ADMIN || payload.role === RoleType.CUSTOMER) {
            response.isValid = true;

            let script = await ScriptModel.findByPk(req.body?.scriptId);
            if (script !== null) {
                await script
                    .destroy()
                    .then(() => {
                        response.isSuccess = true;
                        response.message = `Delete Script has scriptId:${req.body?.scriptId} success`;
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "This User is not exist";
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
