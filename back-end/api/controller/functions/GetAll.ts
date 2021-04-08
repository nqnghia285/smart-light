import { authenticateUserFromReq } from "../../../@types/authenticate-user";
import { Request, Response } from "express";
import { ControllerModel } from "../../../database/models";
import { ResponseType, RoleType, UserInfo } from "../../../interface";

export async function getAllController(req: Request, res: Response): Promise<void> {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
        controllers: [],
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        if (payload.role === RoleType.ADMIN) {
            response.isValid = true;

            await ControllerModel.findAll()
                .then((controllers) => {
                    response.isSuccess = true;
                    response.message = "Get all controller success";
                    response.controllers = controllers;
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
