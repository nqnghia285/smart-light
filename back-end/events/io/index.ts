import { Server, Socket } from "socket.io";
import { ServerEvent } from "../../interface";
import { handleControllerConnect } from "./functions/HandleControllerConnectEvent";
import { handleControllerSendAckControlLightEvent } from "./functions/HandleControllerSendAckControlLightEvent";
import { handleControllerSendAckControlRoomEvent } from "./functions/HandleControllerSendAckControlRoomEvent";
import { handleDisconnect } from "./functions/HandleDisconnectEvent";

export function ioListener(io: Server) {
    io.on("connection", (socket: Socket) => {
        socket.emit(ServerEvent.SERVER_SEND_ACK_CONNECTION, "IO connected to server.");

        // Listener "controller-connect"
        handleControllerConnect(socket);

        // Listener "controller-send-ack-control-light"
        handleControllerSendAckControlLightEvent(socket);

        // Listener "controller-send-ack-control-room"
        handleControllerSendAckControlRoomEvent(socket);

        // Disconnect
        handleDisconnect(socket);
    });
}
