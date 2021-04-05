"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    userId: { type: sequelize_1.SMALLINT, primaryKey: true, autoIncrement: true },
    fullName: { type: sequelize_1.STRING, allowNull: false },
    email: { type: sequelize_1.STRING, unique: true, allowNull: false, validate: { is: /\S+@\S+\.\S+/i } },
    password: { type: sequelize_1.STRING(60), allowNull: false, validate: { is: /^[\S]{60}$/i } },
    role: { type: sequelize_1.ENUM({ values: ["customer", "admin"] }), allowNull: false, defaultValue: "customer" },
    mcuId: { type: sequelize_1.SMALLINT, allowNull: false },
    info: {
        type: sequelize_1.VIRTUAL,
        get() {
            return { userId: this.userId, fullName: this.fullName, email: this.email, role: this.role, mcuId: this.mcuId };
        },
    },
}, { sequelize: connection_1.sequelize });
