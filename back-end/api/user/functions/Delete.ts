import { Request, Response } from "express";
import { authenticateUserFromReq } from "../../../@types/authentication";
import { UserModel } from "../../../database/models";
import { ResponseType, RoleType, UserInfo } from "../../../interface";

export async function deleteUser(req: Request, res: Response): Promise<void> {
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

            let user = await UserModel.findByPk(req.body?.userId);
            if (user !== null) {
                await user
                    .destroy()
                    .then(() => {
                        response.isSuccess = true;
                        response.message = `Delete User has user_id:${req.body?.userId} success`;
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
