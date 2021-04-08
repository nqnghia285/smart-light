import { authenticateUserFromReq } from "../../../@types/authenticate-user";
import { Request, Response } from "express";
import { UserModel } from "../../../database/models";
import { Controller } from "../../../database/models/Controller";
import { ResponseType, RoleType, UserInfo } from "../../../interface";

export async function getAllUser(req: Request, res: Response): Promise<void> {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
        users: [],
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        if (payload.role === RoleType.ADMIN) {
            response.isValid = true;

            const attributes = ["userId", "fullName", "email", "role", "createAt", "updateAt"];
            const include = [{ model: Controller }];
            await UserModel.findAll({ attributes: attributes, include: include })
                .then((users) => {
                    response.isSuccess = true;
                    response.message = "Get all user success";
                    response.users = users;
                })
                .catch((err) => {
                    response.message = `Error: ${err.message}`;
                });
        } else {
            response.message = "This account does not have this permission";
        }
    } else {
        response.message = "The user token is invalid";
    }

    // Response to client
    res.json(response);
}
