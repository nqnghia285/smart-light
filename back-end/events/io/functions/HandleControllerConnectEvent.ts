import { Socket } from "socket.io";
import log from "../../../@types/log";
import { ControllerModel, LightModel, RoomModel } from "../../../database/models";
import { ControllerEvent, LightInterface, RoomInterface, ServerEvent } from "../../../interface";

export function handleControllerConnect(socket: Socket) {
    socket.on(ControllerEvent.CONTROLLER_CONNECT, async (message) => {
        const response: { isSuccess: boolean; rooms: RoomInterface[] } = { isSuccess: false, rooms: [] };
        const code = message?.code;
        const include = [{ model: RoomModel, as: "rooms", attributes: ["roomId", "name"], include: [{ model: LightModel, as: "lights", attributes: ["lightId", "name"] }] }];
        await ControllerModel.findOne({ where: { code: code }, include: include })
            .then(async (controller) => {
                if (controller !== null) {
                    const rooms: RoomInterface[] = [];
                    controller.rooms?.forEach((room) => {
                        const lights: LightInterface[] = [];
                        room.lights?.forEach((light) => {
                            lights.push({ lightId: light.lightId, name: light.name });
                        });
                        rooms.push({ roomId: room.roomId, name: room.name, lights: lights });
                    });
                    response.isSuccess = true;
                    response.rooms = rooms;
                }
            })
            .catch((err) => {
                log("Error: ", err.message);
            });

        // Response to controller
        socket.emit(ServerEvent.SERVER_SEND_ACK_CONTROLLER_CONNECT, response);
    });
}
