/// <reference types="node" />
/// <reference path="../../interface/index.ts" />
/// <reference types="jsonwebtoken" />
/// <reference types="socket.io" />
/// <reference path="index.ts" />

import { SignOptions } from "jsonwebtoken";
import { Socket } from "socket.io";
import { RequestType, UserInfo } from "../../interface";

declare module authentication {
    export function authenticateUser(token: string): UserInfo | undefined;
    export function createToken(payload: string | object | Buffer, option?: SignOptions | undefined): string | undefined;
    export function authenticateUserFromReq(req: Request | RequestType): UserInfo | undefined;
    export function authenticateUserFromSocket(socket: Socket): UserInfo | undefined;
}
