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
import { sequelize } from "../connection";
import { Light } from "./Light";

export interface RoomAttributes {
    roomId?: number;
    name?: string;
    mcuId?: number;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, "roomId"> {}

export class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
    // Attributes
    public roomId!: number;
    public name!: string;
    public mcuId!: number;

    // Timestamps
    public readonly createAt!: Date;
    public readonly updateAt!: Date;

    // Associate model
    public readonly lights?: Light[];
    public getLights!: HasManyGetAssociationsMixin<Light>;
    public hasLight!: HasManyHasAssociationsMixin<Light, number>;
    public addLight!: HasManyAddAssociationMixin<Light, number>;
    public countLights!: HasManyCountAssociationsMixin;
    public createLight!: HasManyCreateAssociationMixin<Light>;

    public static associations: {
        lights: Association<Room, Light>;
    };
}

Room.init(
    {
        // Model attributes are defined here
        roomId: { type: SMALLINT, primaryKey: true, autoIncrement: true },

        name: { type: STRING, allowNull: false },

        mcuId: { type: SMALLINT, allowNull: false },
    },
    { sequelize },
);
