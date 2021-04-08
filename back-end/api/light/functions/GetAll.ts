import { authenticateUserFromReq } from "../../../@types/authenticate-user";
import { Request, Response } from "express";
import { LightModel } from "../../../database/models";
import { Controller } from "../../../database/models/Controller";
import { Room } from "../../../database/models/Room";
import { ResponseType, UserInfo } from "../../../interface";

export async function getAllLight(req: Request, res: Response): Promise<void> {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
        lights: [],
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        response.isValid = true;

        const attributes = ["lightId", "name", "createAt", "updateAt"];
        const include = [
            { model: Controller, attributes: ["mcuId", "code", "type"] },
            { model: Room, attributes: ["roomId", "name"] },
        ];
        await LightModel.findAll({ attributes: attributes, include: include })
            .then((lights) => {
                response.isSuccess = true;
                response.message = "Get all light success";
                response.lights = lights;
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
