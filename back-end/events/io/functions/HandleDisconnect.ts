import { Socket } from "socket.io";

export function handleDisconnect(socket: Socket) {
    socket.on("disconnect", (message) => {
        console.log("disconnect: ", message);
        socket.disconnect(true);
    });
}
