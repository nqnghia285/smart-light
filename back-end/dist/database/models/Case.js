"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Case extends sequelize_1.Model {
}
exports.Case = Case;
Case.init({
    caseId: { type: sequelize_1.SMALLINT, primaryKey: true, autoIncrement: true },
    lightId: { type: sequelize_1.SMALLINT, allowNull: false },
    status: { type: sequelize_1.ENUM({ values: ["on", "off"] }), allowNull: false, defaultValue: "off" },
}, { sequelize: connection_1.sequelize });
