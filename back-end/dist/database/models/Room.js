"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Room extends sequelize_1.Model {
}
exports.Room = Room;
Room.init({
    roomId: { type: sequelize_1.SMALLINT, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.STRING, allowNull: false },
    mcuId: { type: sequelize_1.SMALLINT, allowNull: false },
}, { sequelize: connection_1.sequelize });
