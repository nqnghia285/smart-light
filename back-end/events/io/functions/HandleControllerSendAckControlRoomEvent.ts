import { Socket } from "socket.io";
import { ControllerEvent, ServerEvent } from "../../../interface";
import { client } from "../../../server";

export function handleControllerSendAckControlRoomEvent(socket: Socket) {
    socket.on(ControllerEvent.CONTROLLER_SEND_ACK_CONTROL_ROOM, (message) => {
        const res: { userId: number; isSuccess: boolean; message: string } = message;

        if (res.isSuccess) {
            res.message = "Control room success!";
        } else {
            res.message = "Control room fail!";
        }

        client.emit(ServerEvent.SERVER_SEND_ACK_CONTROL_ROOM, res);
    });
}
