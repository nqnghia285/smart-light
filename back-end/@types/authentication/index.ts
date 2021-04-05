import { Request } from "express";
import jwt from "jsonwebtoken";
import { RequestType, UserInfo } from "../../interface";
import log from "../log";
const jwtKey: jwt.Secret = process.env.JWT_KEY || "jwt-key-dev";

// Authenticate user
// Return payload if token is valid
// otherwise return undefined
export function authenticateUser(token: string) {
    try {
        const obj: any = jwt.verify(token, jwtKey);
        const payload: UserInfo = obj;
        return payload;
    } catch (error) {
        log(error);
        return undefined;
    }
}

// Create a token for payload
// Return an encoded token if the function is not error
// otherwise return undefined
export function createToken(payload: string | object | Buffer, option?: jwt.SignOptions | undefined) {
    try {
        return jwt.sign(payload, jwtKey, option);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// Authenticate user
// Return payload if token is valid
// otherwise return undefined
export function authenticateUserFromReq(req: Request | RequestType) {
    // Get token in headers
    // let userToken = req.headers['authorization'] || req.headers['x-access-token']
    // console.log('cookie: ' + req.headers.cookie);
    // console.log('Cookies: ' + JSON.stringify(req.cookies))
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
