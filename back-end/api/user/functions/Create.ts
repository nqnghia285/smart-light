import { Request, Response } from "express";
import { ControllerModel, UserModel } from "../../../database/models";
import { ResponseType, RoleType, UserInfo, UserType } from "../../../interface";
import dotenv from "dotenv";
import { authenticateUserFromReq } from "authenticate-user";
import { hashPWD } from "customed-bcrypt";

dotenv.config();

export async function createUser(req: Request, res: Response): Promise<void> {
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
            const user: UserType = {
                fullName: "",
                email: "",
                password: "",
                role: "",
            };
            getParams(user, req);

            // Check email
            let userDB = await UserModel.findOne({ where: { email: user.email } });

            if (userDB === null) {
                // Insert new instance into database
                await ControllerModel.findOne({ where: { code: process.env.CODE } })
                    .then(async (controller) => {
                        await controller
                            ?.createUser({ fullName: user.fullName, email: user.email, password: user.password, role: user.role })
                            .then(() => {
                                response.isSuccess = true;
                                response.message = "Create User success";
                            })
                            .catch((err) => {
                                response.message = `Error: ${err.message}`;
                            });
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "This email existed in database";
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

function getParams(user: UserType, req: Request): void {
    user.fullName = req.body?.fullName;
    user.email = req.body?.email;
    user.password = hashPWD(req.body?.password);
    user.role = req.body?.role;
}
