import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { RequestType } from "../../interface";
import { cookieParse } from "../cookie";

export function parser() {
    return function (socket: Socket) {
        const req: RequestType = socket.request;
        const cookies = cookieParse(socket.request.headers.cookie);
        req.cookies = cookies;
    };
}

export default function socketIoCookieParser() {
    return function (socket: Socket, next: (err?: ExtendedError | undefined) => void) {
        const req: RequestType = socket.request;
        const cookies = cookieParse(socket.request.headers.cookie);
        req.cookies = cookies;
        next();
    };
}
