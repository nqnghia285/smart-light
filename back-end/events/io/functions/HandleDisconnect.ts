import { Socket } from "socket.io";
import log from "../../../@types/log";

export function handleDisconnect(socket: Socket) {
    socket.on("disconnect", (message) => {
        log("disconnect: ", message);
        socket.disconnect(true);
    });
}
