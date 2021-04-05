"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
exports.sequelize = connect();
function connect() {
    if (process.env.ENV_NODE === "production") {
        const DATABASE_URL = process.env.DATABASE_URL || "undefined";
        return new sequelize_1.Sequelize(DATABASE_URL, {
            dialectOptions: {
                ssl: {
                    rejectUnauthorized: false,
                },
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            define: {
                freezeTableName: true,
                timestamps: false,
            },
        });
    }
    else {
        const database = process.env.DATABASE || "smart-light";
        const username = process.env.USER || "postgres";
        const password = process.env.PASSWORD;
        const dialect = dialectConvert(process.env.DIALECT);
        const host = process.env.HOST;
        const port = process.env.DATABASE_PORT;
        return new sequelize_1.Sequelize(database, username, password, {
            dialect: dialect,
            dialectOptions: {
                host: host,
                port: port,
                user: username,
                password: password,
                database: database,
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            define: {
                freezeTableName: true,
                timestamps: true,
            },
        });
    }
}
function dialectConvert(dialect) {
    const mysql = "mysql";
    const postgres = "postgres";
    const sqlite = "sqlite";
    const mariadb = "mariadb";
    const mssql = "mssql";
    switch (dialect) {
        case "mysql":
            return mysql;
        case "postgres":
            return postgres;
        case "sqlite":
            return sqlite;
        case "mariadb":
            return mariadb;
        case "mssql":
            return mssql;
        default:
            return "postgres";
    }
}
