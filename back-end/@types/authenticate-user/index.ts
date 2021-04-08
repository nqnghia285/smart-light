import { Request } from "express";
import { SignOptions, Secret, verify, sign } from "jsonwebtoken";
import { Socket } from "socket.io";
import { RequestType, UserInfo } from "../../interface";

const jwtKey: Secret = process.env.JWT_KEY || "jwt-key-dev";

/**
 * @method authenticateUser: Return payload if token is valid, otherwise return undefined
 * @param token
 * @returns UserInfo | undefined
 */
export function authenticateUser(token: string): UserInfo | undefined {
    try {
        const obj: any = verify(token, jwtKey);
        const payload: UserInfo = obj;
        return payload;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

/**
 * @method createToken: Return an encoded token if the function is not error, otherwise return undefined
 * @param payload
 * @param option
 * @returns string | undefined
 */
export function createToken(payload: string | object | Buffer, option?: SignOptions | undefined): string | undefined {
    try {
        return sign(payload, jwtKey, option);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

/**
 * @method authenticateUserFromReq: Return payload if token is valid, otherwise return undefined
 * @param req
 * @returns UserInfo | undefined
 */
export function authenticateUserFromReq(req: Request | RequestType): UserInfo | undefined {
    let userToken: string = req?.cookies?.token;
    if (userToken !== undefined) {
        // Remove 'Bearer ' from userToken
        if (userToken.startsWith("Bearer ")) {
            userToken = userToken.slice(7, userToken.length);
        }

        return authenticateUser(userToken);
    } else {
        return undefined;
    }
}

/**
 * @method authenticateUserFromSocket
 * @param socket
 * @returns UserInfo | undefined
 */
export function authenticateUserFromSocket(socket: Socket): UserInfo | undefined {
    const req: RequestType = socket.request;
    return authenticateUserFromReq(req);
}
