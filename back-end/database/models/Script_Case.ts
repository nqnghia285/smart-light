import { Model, Optional, SMALLINT } from "sequelize";
import { sequelize } from "../connection";

export interface Script_CaseAttributes {
    scriptId?: number;
    caseId?: number;
}

interface Script_CaseCreationAttributes extends Optional<Script_CaseAttributes, "scriptId" | "caseId"> {}

export class Script_Case extends Model<Script_CaseAttributes, Script_CaseCreationAttributes> implements Script_CaseAttributes {
    public scriptId!: number;
    public caseId!: number;

    // Timestamps
    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}

Script_Case.init(
    {
        // Model attributes are defined here
        scriptId: { type: SMALLINT, primaryKey: true },

        caseId: { type: SMALLINT, primaryKey: true },
    },
    { sequelize },
);
