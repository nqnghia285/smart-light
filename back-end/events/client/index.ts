import { Namespace, Socket } from "socket.io";
import { ServerEvent } from "../../interface";
import { handleClientSendControlLightEvent } from "./functions/HandleClientSendControlLightEvent";
import { handleClientSendControlRoomEvent } from "./functions/HandleClientSendControlRoomEvent";
import { handleClientSendMessageEvent } from "./functions/HandleClientSendMessageEvent";

export function clientListener(client: Namespace) {
    client.on("connection", (socket: Socket) => {
        socket.emit(ServerEvent.SERVER_SEND_ACK_CONNECTION, "Client connected to server.");

        // Listener "client-send-message"
        handleClientSendMessageEvent(socket);

        // Listener "client-send-control-light"
        handleClientSendControlLightEvent(socket);

        // Listener "client-send-control-room"
        handleClientSendControlRoomEvent(socket);
    });
}
