import io from "setup-socket.io";
import { Socket } from "socket.io";
import { ClientEvent, ControllerInterface, ServerEvent } from "../../../interface";
import { app, client } from "../../../server";

export function handleClientSendControlRoomEvent(socket: Socket) {
    socket.on(ClientEvent.CLIENT_SEND_CONTROL_ROOM, (message) => {
        const req: { userId: number; roomId: number; status: boolean } = message;

        if (checkRoom(req.roomId)) {
            const lights = getLightListOfRoom(req.roomId);
            if (lights !== undefined) {
                const cmd = { userId: req.userId, lights: lights, status: req.status };
                io.emit(ServerEvent.SERVER_SEND_CONTROL_ROOM, cmd);
            } else {
                const res = { userId: req.userId, isSuccess: false, message: "Room don't exist in Room List!" };
                client.emit(ServerEvent.SERVER_SEND_ACK_CONTROL_ROOM, res);
            }
        } else {
            const res = { userId: req.userId, isSuccess: false, message: "Control room fail!" };
            client.emit(ServerEvent.SERVER_SEND_ACK_CONTROL_ROOM, res);
        }
    });
}

function checkRoom(roomId: number): boolean {
    const controller: ControllerInterface = app.locals.controller;

    controller?.rooms?.forEach((room) => {
        if (room.roomId === roomId) return true;
    });

    return false;
}

function getLightListOfRoom(roomId: number): number[] | undefined {
    const controller: ControllerInterface = app.locals.controller;

    controller?.rooms?.forEach((room) => {
        if (room.roomId === roomId) {
            const lights: number[] = [];
            room.lights?.forEach((light) => {
                if (light.lightId !== undefined) lights.push(light.lightId);
            });
            return lights;
        }
    });

    return undefined;
}
