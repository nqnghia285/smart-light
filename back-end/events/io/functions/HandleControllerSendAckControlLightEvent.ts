import { Socket } from "socket.io";
import { ControllerEvent, ServerEvent } from "../../../interface";
import { client } from "../../../server";

export function handleControllerSendAckControlLightEvent(socket: Socket) {
    socket.on(ControllerEvent.CONTROLLER_SEND_ACK_CONTROL_LIGHT, (message) => {
        const res: { userId: number; isSuccess: boolean; message: string } = message;
        if (res.isSuccess) {
            res.message = "Control light success!";
        } else {
            res.message = "Control light fail!";
        }

        client.emit(ServerEvent.SERVER_SEND_ACK_CONTROL_LIGHT, res);
    });
}
