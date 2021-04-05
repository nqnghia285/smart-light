"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Light extends sequelize_1.Model {
}
exports.Light = Light;
Light.init({
    lightId: { type: sequelize_1.SMALLINT, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.STRING, allowNull: false },
    mcuId: { type: sequelize_1.SMALLINT, allowNull: false },
    roomId: { type: sequelize_1.SMALLINT, allowNull: false },
}, { sequelize: connection_1.sequelize });
