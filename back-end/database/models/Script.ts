import { Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, HasManyHasAssociationsMixin, Model, Optional, SMALLINT, STRING } from "sequelize";
import { sequelize } from "../connection";
import { Case } from "./Case";

export interface ScriptAttributes {
    scriptId?: number;
    name?: string;
    userId?: number;
    timeOn?: string;
    timeOff?: string;
}

interface ScriptCreationAttributes extends Optional<ScriptAttributes, "scriptId"> {}

export class Script extends Model<ScriptAttributes, ScriptCreationAttributes> implements ScriptAttributes {
    // Attributes
    public scriptId!: number;
    public name!: string;
    public userId!: number;
    public timeOff!: string;
    public timeOn!: string;

    // Timestamps
    public readonly createAt!: Date;
    public readonly updateAt!: Date;

    // Associate model
    public readonly cases?: Case[];
    public getCases!: HasManyGetAssociationsMixin<Case>;
    public hasCase!: HasManyHasAssociationsMixin<Case, number>;
    public addCase!: HasManyAddAssociationMixin<Case, number>;
    public countCases!: HasManyCountAssociationsMixin;

    public static associations: {
        cases: Association<Script, Case>;
    };
}

Script.init(
    {
        // Model attributes are defined here
        scriptId: { type: SMALLINT, primaryKey: true, autoIncrement: true },

        name: { type: STRING, allowNull: false },

        userId: { type: SMALLINT, allowNull: false },

        timeOn: { type: STRING(5), allowNull: false, validate: { is: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/g } },

        timeOff: { type: STRING(5), allowNull: false, validate: { is: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/g } },
    },
    { sequelize },
);
