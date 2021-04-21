import { Socket } from "socket.io";
import { ControllerEvent, ServerEvent } from "../../../interface";

export function handleControllerSendMessageEvent(socket: Socket) {
    socket.on(ControllerEvent.CONTROLLER_SEND_MESSAGE, (message) => {
        console.log("Controller says: ", message);
        socket.emit(ServerEvent.SERVER_SEND_MESSAGE, "Hi! " + message?.message);
    });
}
