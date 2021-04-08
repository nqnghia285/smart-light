import { authenticateUserFromReq } from "../../../@types/authenticate-user";
import { Request, Response } from "express";
import { ControllerModel, RoomModel } from "../../../database/models";
import { ResponseType, RoleType, RoomType, UserInfo } from "../../../interface";

export async function createRoom(req: Request, res: Response): Promise<void> {
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
            // Declare object of model type
            const room: RoomType = {
                name: "",
            };
            getParams(room, req);

            // Check room name
            let roomNameExist = await RoomModel.findOne({ where: { name: room.name } });

            if (roomNameExist === null) {
                // Insert new instance into database
                await ControllerModel.findByPk(1)
                    .then(async (controller) => {
                        await controller
                            ?.createRoom({ name: room.name })
                            .then(() => {
                                response.isSuccess = true;
                                response.message = "Create Room success";
                            })
                            .catch((err) => {
                                response.message = `Error: ${err.message}`;
                            });
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "This room name existed in database";
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

function getParams(room: RoomType, req: Request): void {
    room.name = req.body?.name;
}
