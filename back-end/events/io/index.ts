import { Server, Socket } from "socket.io";
import { ServerEvent } from "../../interface";
import { handleControllerConnect } from "./functions/HandleControllerConnectEvent";
import { handleDisconnect } from "./functions/HandleDisconnect";

export function ioListener(io: Server) {
    io.on("connection", (socket: Socket) => {
        socket.emit(ServerEvent.SERVER_SEND_ACK_CONNECTION, "Connected to server.");

        // Listener "client-send-message"

        // Listener "controller-connect"
        handleControllerConnect(socket);

        // Disconnect
        handleDisconnect(socket);
    });
}
