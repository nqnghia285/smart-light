import { Socket } from "socket.io";
import { ControllerModel, LightModel } from "../../../database/models";
import { ControllerEvent, ControllerInterface, ServerEvent } from "../../../interface";
import { app } from "../../../server";

export function handleControllerConnect(socket: Socket) {
    socket.on(ControllerEvent.CONTROLLER_CONNECT, async (message) => {
        const response: { isSuccess: boolean; lights: number[] } = { isSuccess: false, lights: [] };
        const where = { code: message?.code };
        const include = [{ model: LightModel, as: "lights", attributes: ["lightId"] }];
        await ControllerModel.findOne({ where: where, include: include })
            .then(async (controllerDB) => {
                if (controllerDB !== null) {
                    const lights: number[] = [];
                    controllerDB.lights?.forEach((light) => {
                        lights.push(light.lightId);
                    });
                    response.isSuccess = true;
                    response.lights = lights;

                    const controller: ControllerInterface = app.locals.controller;
                    controller.status = true;

                    console.log("Controller in app: ", app.locals.controller);
                }
            })
            .catch((err) => {
                console.log("Error: ", err.message);
            });

        // Response to controller
        socket.emit(ServerEvent.SERVER_SEND_ACK_CONTROLLER_CONNECT, response);
    });

    // const controller: ControllerInterface = app.locals.controller;

    // console.log("Controller connect: ", app.locals.controller);
    // console.log("Rooms: ", controller?.rooms);
}
