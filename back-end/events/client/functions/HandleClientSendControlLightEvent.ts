import io from "setup-socket.io";
import { Socket } from "socket.io";
import { ClientEvent, ControllerInterface, ServerEvent } from "../../../interface";
import { app } from "../../../server";

export function handleClientSendControlLightEvent(socket: Socket) {
    socket.on(ClientEvent.CLIENT_SEND_CONTROL_LIGHT, (message) => {
        const req: { userId: number; lightId: number; status: boolean } = message;

        if (checkLight(req.lightId)) {
            io.emit(ServerEvent.SERVER_SEND_CONTROL_LIGHT, req);
        } else {
            const res = { userId: req.userId, isSuccess: false, message: "Control light fail!" };
            socket.emit(ServerEvent.SERVER_SEND_ACK_CONTROL_LIGHT, res);
        }
    });
}

function checkLight(lightId: number): boolean {
    const controller: ControllerInterface = app.locals.controller;

    controller?.rooms?.forEach((room) => {
        room.lights?.forEach((light) => {
            if (light.lightId === lightId) return true;
        });
    });

    return false;
}
