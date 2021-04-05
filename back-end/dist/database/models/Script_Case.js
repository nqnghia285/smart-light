"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script_Case = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Script_Case extends sequelize_1.Model {
}
exports.Script_Case = Script_Case;
Script_Case.init({
    scriptId: { type: sequelize_1.SMALLINT, primaryKey: true },
    caseId: { type: sequelize_1.SMALLINT, primaryKey: true },
}, { sequelize: connection_1.sequelize });
