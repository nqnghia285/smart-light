import { authenticateUserFromReq } from "authenticate-user";
import { Request, Response } from "express";
import { CaseModel, ScriptModel } from "../../../database/models";
import { ResponseType, ScriptType, StatusLight, StatusType, UserInfo } from "../../../interface";

export async function createScript(req: Request, res: Response): Promise<void> {
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
        const script: ScriptType = {
            name: "",
            userId: 0,
            timeOn: "",
            timeOff: "",
        };
        script.userId = payload.userId;
        getParams(script, req);

        const statusLights: StatusLight[] | undefined = req.body?.lights;

        // Insert new instance into database
        await ScriptModel.create(script)
            .then(async (scriptDB) => {
                response.isSuccess = true;
                response.message = "Create Script success";

                if (statusLights !== undefined) {
                    for (const light of statusLights) {
                        let c = await CaseModel.findOne({ where: { lightId: light.lightId, status: light.status ? StatusType.ON : StatusType.OFF } });
                        if (c !== null) {
                            await scriptDB.addCase(c);
                        }
                    }
                }
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

function getParams(script: ScriptType, req: Request): void {
    script.name = req.body?.name;
    script.timeOn = req.body?.timeOn;
    script.timeOff = req.body?.timeOff;
}
