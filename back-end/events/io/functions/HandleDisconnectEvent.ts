import { Socket } from "socket.io";
import { ControllerInterface } from "../../../interface";
import { app } from "../../../server";

export function handleDisconnect(socket: Socket) {
    socket.on("disconnect", (message) => {
        const controller: ControllerInterface = app.locals.controller;
        const rooms = controller?.rooms;
        controller.status = false;
        rooms?.forEach((room) => {
            room?.lights?.forEach((light) => {
                light.status = false;
            });
        });
        console.log("disconnect: ", message);
        socket.disconnect(true);
    });
}
