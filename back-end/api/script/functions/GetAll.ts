import { authenticateUserFromReq } from "authenticate-user";
import { Request, Response } from "express";
import { FindAttributeOptions, Includeable } from "sequelize/types";
import { ScriptModel, UserModel } from "../../../database/models";
import { ResponseType, RoleType, UserInfo } from "../../../interface";

export async function getAllScript(req: Request, res: Response): Promise<void> {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
        scripts: [],
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        if (payload.role === RoleType.ADMIN) {
            response.isValid = true;

            const attributes: FindAttributeOptions = ["scriptId", "name", "timeOn", "timeOff"];
            const include: Includeable | Includeable[] = [{ model: UserModel, attributes: ["userId", "fullName"] }];
            await ScriptModel.findAll({ attributes: attributes, include: include })
                .then((scripts) => {
                    response.isSuccess = true;
                    response.message = "Get all script success";
                    response.scripts = scripts;
                })
                .catch((err) => {
                    response.message = `Error: ${err.message}`;
                });
        } else if (payload.role === RoleType.CUSTOMER) {
            response.isValid = true;

            const where = { userId: payload.userId };
            const attributes: FindAttributeOptions = ["scriptId", "name", "timeOn", "timeOff"];
            const include: Includeable | Includeable[] = [{ model: UserModel, attributes: ["userId", "fullName"] }];
            await ScriptModel.findAll({ where: where, attributes: attributes, include: include })
                .then((scripts) => {
                    response.isSuccess = true;
                    response.message = "Get all script success";
                    response.scripts = scripts;
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
