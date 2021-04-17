import {
    Association,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationsMixin,
    Model,
    Optional,
    SMALLINT,
    STRING,
} from "sequelize";
import sequelize from "sequelize-connection";
import { Light } from "./Light";
import { Room } from "./Room";
import { User } from "./User";

interface ControllerAttributes {
    mcuId?: number;
    code?: string;
    type?: string;
}

interface ControllerCreationAttributes extends Optional<ControllerAttributes, "mcuId"> {}

export class Controller extends Model<ControllerAttributes, ControllerCreationAttributes> implements ControllerAttributes {
    public mcuId!: number;
    public code!: string;
    public type!: string;

    // Timestamps
    public readonly createAt!: Date;
    public readonly updateAt!: Date;

    // Associate model
    public readonly users?: User[];
    public getUsers!: HasManyGetAssociationsMixin<User>;
    public hasUser!: HasManyHasAssociationsMixin<User, number>;
    public addUser!: HasManyAddAssociationMixin<User, number>;
    public countUsers!: HasManyCountAssociationsMixin;
    public createUser!: HasManyCreateAssociationMixin<User>;

    public readonly rooms?: Room[];
    public getRooms!: HasManyGetAssociationsMixin<Room>;
    public hasRoom!: HasManyHasAssociationsMixin<Room, number>;
    public addRoom!: HasManyAddAssociationMixin<Room, number>;
    public countRooms!: HasManyCountAssociationsMixin;
    public createRoom!: HasManyCreateAssociationMixin<Room>;

    public readonly lights?: Light[];
    public getLights!: HasManyGetAssociationsMixin<Light>;
    public hasLight!: HasManyHasAssociationsMixin<Light, number>;
    public addLight!: HasManyAddAssociationMixin<Light, number>;
    public countLights!: HasManyCountAssociationsMixin;
    public createLight!: HasManyCreateAssociationMixin<Light>;

    public static associations: {
        users: Association<Controller, User>;
        rooms: Association<Controller, Room>;
        lights: Association<Controller, Light>;
    };
}

Controller.init(
    {
        // Model attributes are defined here
        mcuId: { type: SMALLINT, primaryKey: true, autoIncrement: true },

        code: { type: STRING, unique: true, allowNull: false },

        type: { type: STRING, allowNull: false },
    },
    { sequelize },
);
