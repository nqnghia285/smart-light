import { ControllerModel, ScriptModel } from "./models";
import { Room } from "./models/Room";

export async function createTemplates() {
    const rooms: { name?: string }[] = [];
    for (let i = 0; i < 3; i++) {
        rooms.push({ name: "Room " + (i + 1) });
    }
    console.log("Rooms: ", rooms);

    const lights: { name?: string; mcuId?: number }[] = [];
    for (let i = 0; i < 3; i++) {
        lights.push({ name: "Light " + (i + 1), mcuId: 1 });
    }
    console.log("Lights: ", lights);

    await ControllerModel.findByPk(1, { include: [ControllerModel.associations.rooms, ControllerModel.associations.lights], rejectOnEmpty: true }).then(async (controller) => {
        for (const room of rooms) {
            await controller?.createRoom(room);
        }
        // Reload date of instance
        await controller?.reload();
        console.log("Rooms of controoler: ", controller?.rooms);
        controller?.rooms?.forEach((room: Room) => {
            lights.forEach(async (light) => {
                await room?.createLight(light);
            });
        });

        setTimeout(async () => {
            // Reload date of instance
            await controller?.reload();
            console.log("Lights of controller: ", controller.lights);

            await ScriptModel.create({ name: "Script 1", userId: 1, timeOn: "18:30", timeOff: "23:00" }).then(async (script) => {
                await script.addCase(1);
                await script.addCase(2);
                await script.addCase(3);
                await script.addCase(4);
                console.log("Case of script: ", await script.getCases());

                await ScriptModel.findByPk(1, { include: [ScriptModel.associations.cases], rejectOnEmpty: true }).then((script) => {
                    console.log("Cases: ", script.cases);
                });
            });
        }, 3000);
    });
}
