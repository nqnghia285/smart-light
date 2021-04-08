import { Socket } from "socket.io";
import log from "../../../@types/log";
import { ControllerModel, LightModel } from "../../../database/models";
import { ControllerEvent, ServerEvent } from "../../../interface";

export function handleControllerConnect(socket: Socket) {
    socket.on(ControllerEvent.CONTROLLER_CONNECT, async (message) => {
        const response: { isSuccess: boolean; lights: number[] } = { isSuccess: false, lights: [] };
        const where = { code: message?.code };
        const include = [{ model: LightModel, as: "lights", attributes: ["lightId"] }];
        await ControllerModel.findOne({ where: where, include: include })
            .then(async (controller) => {
                if (controller !== null) {
                    const lights: number[] = [];
                    controller.lights?.forEach((light) => {
                        lights.push(light.lightId);
                    });
                    response.isSuccess = true;
                    response.lights = lights;
                }
            })
            .catch((err) => {
                log("Error: ", err.message);
            });

        // Response to controller
        socket.emit(ServerEvent.SERVER_SEND_ACK_CONTROLLER_CONNECT, response);
    });
}
