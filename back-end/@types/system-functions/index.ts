import dotenv from "dotenv";
import { RoomModel } from "../../database/models";
import { Light } from "../../database/models/Light";
import { ControllerInterface, LightInterface, RoomInterface } from "../../interface";
import { app } from "../../server";

dotenv.config();

export async function initController(): Promise<void> {
    const attributes = ["roomId", "name"];
    const include = [{ model: Light, as: "lights", attributes: ["lightId", "name"] }];
    await RoomModel.findAll({ attributes: attributes, include: include })
        .then(async (roomList) => {
            const rooms: Array<RoomInterface> = [];

            roomList?.forEach((room) => {
                const lights: LightInterface[] = [];
                room?.lights?.forEach((light) => {
                    lights.push({ lightId: light.lightId, name: light.name, status: false });
                });

                rooms.push({ roomId: room.roomId, name: room.name, lights: lights });
            });

            const controller: ControllerInterface = { status: false, mcuId: 1, code: process.env.CODE, rooms: rooms };

            app.locals.controller = controller;

            console.log("Init Controller: ", app.locals.controller);
            controller?.rooms?.forEach((room) => {
                console.log("lights of room in controller: ", room?.lights);
            });
        })
        .catch((err) => {
            console.log(`Error: ${err.message}`);
        });
}
