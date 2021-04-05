"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Controller extends sequelize_1.Model {
}
exports.Controller = Controller;
Controller.init({
    mcuId: { type: sequelize_1.SMALLINT, primaryKey: true, autoIncrement: true },
    code: { type: sequelize_1.STRING, unique: true, allowNull: false },
    type: { type: sequelize_1.STRING, allowNull: false },
}, { sequelize: connection_1.sequelize });
