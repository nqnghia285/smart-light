import { Socket } from "socket.io";
import { authenticateUserFromSocket } from "../../../@types/authentication";
import log from "../../../@types/log";
import { ClientEvent, RequestType } from "../../../interface";

export function handleClientSendMessageEvent(socket: Socket) {
    socket.on(ClientEvent.CLIENT_SEND_MESSAGE, async (message) => {
        const req: RequestType = socket.request;
        log("Cookies of client:", req.cookies);
        log("client-send-message:", message);
        log("Authenticate: ", authenticateUserFromSocket(socket));
    });
}
