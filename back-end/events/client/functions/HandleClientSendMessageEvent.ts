import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { authenticateUserFromSocket } from "../../../@types/authenticate-user";
import { ClientEvent, RequestType } from "../../../interface";

export function handleClientSendMessageEvent(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
    socket.on(ClientEvent.CLIENT_SEND_MESSAGE, async (message) => {
        const req: RequestType = socket.request;
        console.log("Cookies of client:", req.cookies);
        console.log("client-send-message:", message);
        console.log("Authenticate: ", authenticateUserFromSocket(socket));
    });
}
