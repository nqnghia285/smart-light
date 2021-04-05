import { Request, Response } from "express";
import { Op } from "sequelize";
import { authenticateUserFromReq } from "../../../@types/authentication";
import { hashPWD } from "../../../@types/bcrypt";
import { UserModel } from "../../../database/models";
import { ResponseType, RoleType, UserInfo, UserType } from "../../../interface";

export async function updateUser(req: Request, res: Response) {
    // Authenticate user
    let response: ResponseType = {
        isValid: false,
        isSuccess: false,
        message: "",
    };
    const payload: UserInfo | undefined = authenticateUserFromReq(req);

    if (payload !== undefined) {
        // Declare object of model type
        const isProfile: boolean = req.body?.isProfile;
        let user: UserType = { userId: payload.userId };

        let isPassed = false;

        if (payload.role === RoleType.ADMIN) {
            response.isValid = true;

            if (isProfile) {
                user = {
                    userId: 0,
                    fullName: "",
                    email: "",
                    role: "",
                };
                user.userId = req.body?.userId;
                user.fullName = req.body?.fullName;
                user.email = req.body?.email;
                user.role = req.body?.role;

                let userExist = await UserModel.findOne({
                    where: {
                        [Op.and]: [{ userId: { [Op.ne]: user.userId } }, { email: user.email }],
                    },
                });

                if (userExist === null) isPassed = true;
            } else {
                user = {
                    userId: 0,
                    password: "",
                };
                user.userId = req.body?.userId;
                user.password = hashPWD(req.body?.password);

                isPassed = true;
            }
        } else if (payload.role === RoleType.CUSTOMER && payload.userId === req.body?.userId) {
            response.isValid = true;

            if (isProfile) {
                user = {
                    userId: 0,
                    fullName: "",
                    email: "",
                };
                user.userId = req.body?.userId;
                user.fullName = req.body?.fullName;
                user.email = req.body?.email;

                let userExist = await UserModel.findOne({
                    where: {
                        [Op.and]: [{ userId: { [Op.ne]: user.userId } }, { email: user.email }],
                    },
                });

                if (userExist === null) isPassed = true;
            } else {
                user = {
                    userId: 0,
                    password: "",
                };
                user.userId = req.body?.userId;
                user.password = hashPWD(req.body?.password);

                isPassed = true;
            }
        } else {
            response.message = "This account does not have this permission";
        }

        if (isPassed) {
            let userDB = await UserModel.findByPk(user.userId);

            if (userDB !== null) {
                await userDB
                    .update(user)
                    .then(() => {
                        response.isSuccess = true;
                        response.message = "Update User success";
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "The user is not exist";
            }
        } else {
            response.message = `This email existed in database or this account does not have this permission`;
        }
    } else {
        response.message = "The user token is invalid";
    }

    // Response to client
    res.json(response);
}
