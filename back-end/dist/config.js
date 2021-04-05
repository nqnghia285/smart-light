"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.db = void 0;
const dialect = "postgres";
exports.db = {
    username: "postgres",
    password: "919285",
    database: "smart-light",
    host: "0.0.0.0",
    dialect: dialect,
    port: 5432,
};
exports.server = {
    host: "0.0.0.0",
    port: 5000,
    origin: "http://localhost:3000",
    jwt_key: "secret-key",
};
