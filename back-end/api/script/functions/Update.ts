import { authenticateUserFromReq } from "authenticate-user";
import { Request, Response } from "express";
import { ScriptModel } from "../../../database/models";
import { ResponseType, ScriptType, UserInfo } from "../../../interface";

export async function updateScript(req: Request, res: Response): Promise<void> {
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
            scriptId: 0,
            name: "",
            timeOn: "",
            timeOff: "",
        };
        getParams(script, req);

        // Update instance into database
        let scriptDB = await ScriptModel.findOne({ where: { scriptId: script.scriptId, userId: payload.userId } });
        if (scriptDB !== null) {
            await scriptDB
                .update(script)
                .then(() => {
                    response.isSuccess = true;
                    response.message = "Update Script succes";
                })
                .catch((err) => {
                    response.message = `Error: ${err.message}`;
                });
        } else {
            response.message = "This script does not exist in database";
        }
    } else {
        response.message = "The user token is invalid";
    }

    // Response to client
    res.json(response);
}

function getParams(script: ScriptType, req: Request): void {
    script.scriptId = req.body?.scriptId;
    script.name = req.body?.name;
    script.timeOn = req.body?.timeOn;
    script.timeOff = req.body?.timeOff;
}
