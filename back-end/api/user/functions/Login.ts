import { createToken } from "../../../@types/authenticate-user";
import { Request, Response } from "express";
import { comparePWD } from "../../../@types/bcrypt";
import { RoomModel, UserModel } from "../../../database/models";
import { Light } from "../../../database/models/Light";
import { ResponseType, UserType } from "../../../interface";

const AGE: number = 1 * 60 * 60 * 1000; // 1h
const DOMAIN: string | undefined = process.env.DOMAIN;

export async function login(req: Request, res: Response): Promise<void> {
    let response: ResponseType = {
        isUserExist: false,
        isSuccess: false,
        message: "",
    };

    // Declare object of model type
    const user: UserType = {
        email: "",
        password: "",
    };
    getParams(user, req);

    let userDB = await UserModel.findOne({ where: { email: user.email } });

    if (userDB !== null) {
        response.isUserExist = true;
        if (comparePWD(user.password, userDB.password)) {
            if (userDB.info !== undefined) {
                let userToken = createToken(userDB.info, { expiresIn: "1h" });
                response.userId = userDB.userId;
                response.fullName = userDB.fullName;
                response.email = userDB.email;
                response.role = userDB.role;
                response.isSuccess = true;
                response.message = "Login success!";

                res.cookie("token", userToken, {
                    domain: DOMAIN,
                    maxAge: AGE,
                    secure: false, // Set true if your using https
                    httpOnly: true, // Set true to prevent any script codes access it from client
                });

                const attributes = ["roomId", "name"];
                const include = [{ model: Light, as: "lights", attributes: ["lightId", "name"] }];
                await RoomModel.findAll({ attributes: attributes, include: include })
                    .then((roomList) => {
                        response.roomList = roomList;
                    })
                    .catch((err) => {
                        response.message = `Error: ${err.message}`;
                    });
            } else {
                response.message = "Error generate JWT";
            }
        } else {
            response.message = "The username and password are not matched.";
        }
    } else {
        response.message = "user is not exist";
    }

    // Response to client
    res.json(response);
}

function getParams(user: UserType, req: Request): void {
    user.email = req.body?.email;
    user.password = req.body?.password;
}
