import { Request, Response } from "express";
import { Op } from "sequelize";
import { authenticateUserFromReq } from "../../../@types/authentication";
import { RoomModel } from "../../../database/models";
import { ResponseType, RoomType, UserInfo } from "../../../interface";

export async function updateRoom(req: Request, res: Response): Promise<void> {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        response.isValid = true;
        // Declare object of model type
        const room: RoomType = {
            roomId: 0,
            name: "",
        };
        getParams(room, req);

        let roomDB = await RoomModel.findByPk(room.roomId);

        if (roomDB !== null) {
            // Check code
            let roomExist = await RoomModel.findOne({
                where: { [Op.and]: [{ roomId: { [Op.ne]: room.roomId } }, { name: room.name }] },
            });

            if (roomExist === null) {
                // Update instance into database
                await roomDB
                    .update(room)
                    .then(() => {
                        response.isSuccess = true;
                        response.message = "Update Room success";
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = `This room name:${room.name} existed in database`;
            }
        } else {
            response.message = `This roomId:${room.roomId} does not exist in database`;
        }
    } else {
        response.message = "The user token is invalid";
    }

    // Response to client
    res.json(response);
}

function getParams(room: RoomType, req: Request): void {
    room.roomId = req.body?.roomId;
    room.name = req.body?.name;
}
