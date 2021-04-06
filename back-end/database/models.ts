// import dotenv from "dotenv";
import { hashPWD } from "../@types/bcrypt";
import { dotenvConfig } from "../@types/dotenv";
import log from "../@types/log";
import { initController } from "../@types/system-functions";
import { StatusType } from "../interface";
import { sequelize } from "./connection";
import { Case } from "./models/Case";
import { Controller } from "./models/Controller";
import { Light } from "./models/Light";
import { Room } from "./models/Room";
import { Script } from "./models/Script";
import { User } from "./models/User";
import { createTemplates } from "./templates";

dotenvConfig();

// Export models
export const CaseModel = Case;
export const ControllerModel = Controller;
export const LightModel = Light;
export const RoomModel = Room;
export const ScriptModel = Script;
export const UserModel = User;

// Define constraints
User.hasMany(Script, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "userId", as: "scripts" });
Script.belongsTo(User, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "userId" });

Controller.hasMany(User, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId", as: "users" });
User.belongsTo(Controller, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId" });

Script.belongsToMany(Case, { through: "Script_Case", as: "cases" });
Case.belongsToMany(Script, { through: "Script_Case", as: "scripts" });

Light.hasMany(Case, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "lightId", as: "cases" });
Case.belongsTo(Case, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "lightId" });

Controller.hasMany(Light, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId", as: "lights" });
Light.belongsTo(Controller, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId" });

Controller.hasMany(Room, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId", as: "rooms" });
Room.belongsTo(Controller, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "mcuId" });

Room.hasMany(Light, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "roomId", as: "lights" });
Light.belongsTo(Room, { onUpdate: "CASCADE", onDelete: "CASCADE", foreignKey: "roomId" });

/////////////////////////////////////
// Add hooks
Light.afterCreate(async (light: Light, _options) => {
    await light.createCase({ status: StatusType.ON });
    await light.createCase({ status: StatusType.OFF });
});

////////////////////////////////////
// Create tables, constraints, functions, procedures, triggers in DB

// Synchronize database
(async () => {
    const force = { force: process.env.ENV_NODE === "develop" };
    await sequelize
        .sync(force)
        .then(() => {
            log("Notice: ", "Database is synchronized!");
        })
        .catch((err) => {
            log("Sequelize sync: ", err);
        });

    // Add Admin
    await Controller.create({
        code: process.env.CODE,
        type: process.env.TYPE,
    })
        .then(async (controller: Controller) => {
            log("Notice: ", "Add controller success!");
            await User.create({
                fullName: process.env.FULL_NAME,
                email: process.env.EMAIL,
                password: hashPWD(process.env.ACC_PWD),
                role: process.env.ROLE,
                mcuId: controller.mcuId,
            })
                .then(() => {
                    log("Notice: ", "Add admin acconut success!");
                })
                .catch((err) => {
                    log("Add admin acconut: ", err);
                });
        })
        .catch((err) => {
            log("Add controller: ", err);
        });

    // Create templates
    await createTemplates();

    // Initial controller
    setTimeout(async () => {
        await initController();
    }, 5000);
})();
