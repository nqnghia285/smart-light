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
import { Case } from "./Case";

interface LightAttributes {
    lightId?: number;
    name?: string;
    mcuId?: number;
    roomId?: number;
}

interface LightCreationAttributes extends Optional<LightAttributes, "lightId"> {}

export class Light extends Model<LightAttributes, LightCreationAttributes> implements LightAttributes {
    public lightId!: number;
    public name!: string;
    public mcuId!: number;
    public roomId!: number;

    //timestamps
    public readonly createAt!: Date;
    public readonly updateAt!: Date;

    // Associate model
    public readonly cases?: Case[];
    public getCases!: HasManyGetAssociationsMixin<Case>;
    public hasCase!: HasManyHasAssociationsMixin<Case, number>;
    public addCase!: HasManyAddAssociationMixin<Case, number>;
    public countCases!: HasManyCountAssociationsMixin;
    public createCase!: HasManyCreateAssociationMixin<Case>;

    public static associations: {
        cases: Association<Light, Case>;
    };
}

Light.init(
    {
        // Model attributes are defined here
        lightId: { type: SMALLINT, primaryKey: true, autoIncrement: true },

        name: { type: STRING, allowNull: false },

        mcuId: { type: SMALLINT, allowNull: false },

        roomId: { type: SMALLINT, allowNull: false },
    },
    { sequelize },
);
