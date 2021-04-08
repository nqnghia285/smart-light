import { authenticateUserFromReq } from "../../../@types/authenticate-user";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { LightModel } from "../../../database/models";
import { LightType, ResponseType, UserInfo } from "../../../interface";

export async function updateLight(req: Request, res: Response): Promise<void> {
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
        const light: LightType = {
            lightId: 0,
            roomId: 0,
            name: "",
        };
        getParams(light, req);

        let lightDB = await LightModel.findByPk(light.lightId);

        if (lightDB !== null) {
            // Check code
            let lightExist = await LightModel.findOne({
                where: { [Op.and]: [{ roomId: light.roomId }, { lightId: { [Op.ne]: light.lightId } }, { name: light.name }] },
            });

            if (lightExist === null) {
                // Update instance into database
                await lightDB
                    .update(light)
                    .then(() => {
                        response.isSuccess = true;
                        response.message = "Update Light success";
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = `This room name:${light.name} existed in database`;
            }
        } else {
            response.message = `This lightId:${light.lightId} does not exist in database`;
        }
    } else {
        response.message = "The user token is invalid";
    }

    // Response to client
    res.json(response);
}

function getParams(light: LightType, req: Request): void {
    light.lightId = req.body?.lightId;
    light.roomId = req.body?.roomId;
    light.name = req.body?.name;
}
