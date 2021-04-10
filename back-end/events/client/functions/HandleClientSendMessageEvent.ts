import { authenticateUserFromReq } from "authenticate-user";
import { Socket } from "socket.io";
import { ClientEvent, RequestType } from "../../../interface";

export function handleClientSendMessageEvent(socket: Socket) {
    socket.on(ClientEvent.CLIENT_SEND_MESSAGE, async (message) => {
        const req: RequestType = socket.request;
        console.log("Cookies of client:", req.cookies);
        console.log("client-send-message:", message);
        console.log("Authenticate: ", authenticateUserFromReq(req));
    });
}
