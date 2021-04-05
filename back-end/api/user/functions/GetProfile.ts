import { Request, Response } from "express";
import { authenticateUserFromReq } from "../../../@types/authentication";
import { UserModel } from "../../../database/models";
import { Controller } from "../../../database/models/Controller";
import { ResponseType, UserInfo } from "../../../interface";

export async function getProfile(req: Request, res: Response): Promise<void> {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
        user: undefined,
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        response.isValid = true;

        const attributes = ["userId", "fullName", "email", "role", "createAt", "updateAt"];
        const include = [{ model: Controller }];
        await UserModel.findByPk(payload.userId, { attributes: attributes, include: include })
            .then((user) => {
                response.isSuccess = true;
                response.message = "Get profile success";
                response.user = user;
            })
            .catch((err) => {
                response.message = `Error: ${err.message}`;
            });
    } else {
        response.message = "The user token is invalid";
    }

    // Response to client
    res.json(response);
}
