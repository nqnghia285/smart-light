import { authenticateUserFromReq } from "../../../@types/authenticate-user";
import { Request, Response } from "express";
import { RoomModel } from "../../../database/models";
import { Controller } from "../../../database/models/Controller";
import { ResponseType, RoleType, UserInfo } from "../../../interface";

export async function getAllRoom(req: Request, res: Response): Promise<void> {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
        rooms: [],
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        if (payload.role === RoleType.ADMIN) {
            response.isValid = true;

            const attributes = ["roomId", "name", "createAt", "updateAt"];
            await RoomModel.findAll({ attributes: attributes })
                .then((rooms) => {
                    response.isSuccess = true;
                    response.message = "Get all room success";
                    response.rooms = rooms;
                })
                .catch((err) => {
                    response.message = `Error: ${err.message}`;
                });
        } else if (payload.role === RoleType.CUSTOMER) {
            const where = { mcuId: payload.mcuId };
            const attributes = ["roomId", "name", "createAt", "updateAt"];
            const include = [{ model: Controller, attributes: ["mcuId", "code", "type"] }];
            await RoomModel.findAll({ where: where, attributes: attributes, include: include })
                .then((rooms) => {
                    response.isSuccess = true;
                    response.message = "Get all controller success";
                    response.rooms = rooms;
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
