"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotenvConfig = void 0;
function dotenvConfig() {
    if (process.env.NODE_ENV !== "production") {
        require("dotenv").config();
    }
}
exports.dotenvConfig = dotenvConfig;
