import { Request, Response } from "express";
import { authenticateUserFromReq } from "../../../@types/authentication";
import { RoomModel } from "../../../database/models";
import { ResponseType, RoleType, UserInfo } from "../../../interface";

export async function deleteRoom(req: Request, res: Response): Promise<void> {
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

            let room = await RoomModel.findByPk(req.body?.roomId);
            if (room !== null) {
                await room
                    .destroy()
                    .then(() => {
                        response.isSuccess = true;
                        response.message = `Delete Room has mcuId:${req.body?.roomId} success`;
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "This Room is not exist";
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
