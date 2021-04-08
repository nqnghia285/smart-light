import { authenticateUserFromReq } from "../../../@types/authenticate-user";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { LightModel, RoomModel } from "../../../database/models";
import { LightType, ResponseType, RoleType, UserInfo } from "../../../interface";

export async function createLight(req: Request, res: Response): Promise<void> {
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
            const light: LightType = {
                name: "",
                roomId: 0,
            };
            getParams(light, req);

            // Check light name
            let lightNameExist = await LightModel.findOne({
                where: {
                    [Op.and]: [{ roomId: light.roomId }, { name: light.name }],
                },
            });

            if (lightNameExist === null) {
                // Insert new instance into database
                await RoomModel.findByPk(light.roomId)
                    .then(async (room) => {
                        await room
                            ?.createLight({ name: light.name })
                            .then(() => {
                                response.isSuccess = true;
                                response.message = "Create Light success";
                            })
                            .catch((err) => {
                                response.message = `Error: ${err.message}`;
                            });
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "This light name existed in database";
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

function getParams(light: LightType, req: Request): void {
    light.name = req.body?.name;
    light.roomId = req.body?.roomId;
}
