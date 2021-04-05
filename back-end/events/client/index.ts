import { Namespace, Socket } from "socket.io";
import { ServerEvent } from "../../interface";
import { handleClientSendMessageEvent } from "./functions/HandleClientSendMessageEvent";

export function clientListener(client: Namespace) {
    client.on("connection", (socket: Socket) => {
        socket.emit(ServerEvent.SERVER_SEND_ACK_CONNECTION, "Connected to server.");

        // Listener "client-send-message"
        handleClientSendMessageEvent(socket);
    });
}
