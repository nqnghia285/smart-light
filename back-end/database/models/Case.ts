import { Association, ENUM, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, HasManyHasAssociationsMixin, Model, Optional, SMALLINT } from "sequelize";
import { sequelize } from "../connection";
import { Script } from "./Script";

interface CaseAttributes {
    caseId?: number;
    lightId?: number;
    status?: string;
}

interface CaseCreationAttributes extends Optional<CaseAttributes, "caseId"> {}

export class Case extends Model<CaseAttributes, CaseCreationAttributes> implements CaseAttributes {
    public caseId!: number;
    public lightId!: number;
    public status!: string;

    // Timestamps
    public readonly createAt!: Date;
    public readonly updateAt!: Date;

    // Associate model
    public readonly scripts?: Script[];
    public getScripts!: HasManyGetAssociationsMixin<Script>;
    public hasScript!: HasManyHasAssociationsMixin<Script, number>;
    public addScript!: HasManyAddAssociationMixin<Script, number>;
    public countScripts!: HasManyCountAssociationsMixin;

    public static associations: {
        scripts: Association<Case, Script>;
    };
}

Case.init(
    {
        // Model attributes are defined here
        caseId: { type: SMALLINT, primaryKey: true, autoIncrement: true },

        lightId: { type: SMALLINT, allowNull: false },

        status: { type: ENUM({ values: ["on", "off"] }), allowNull: false, defaultValue: "off" },
    },
    { sequelize },
);
