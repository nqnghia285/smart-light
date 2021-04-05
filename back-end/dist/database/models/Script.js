"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Script extends sequelize_1.Model {
}
exports.Script = Script;
Script.init({
    scriptId: { type: sequelize_1.SMALLINT, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.STRING, allowNull: false },
    userId: { type: sequelize_1.SMALLINT, allowNull: false },
    timeOn: { type: sequelize_1.STRING(5), allowNull: false, validate: { is: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/g } },
    timeOff: { type: sequelize_1.STRING(5), allowNull: false, validate: { is: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/g } },
}, { sequelize: connection_1.sequelize });
