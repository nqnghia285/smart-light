"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Create_1 = require("./functions/Create");
const Delete_1 = require("./functions/Delete");
const GetAll_1 = require("./functions/GetAll");
const Update_1 = require("./functions/Update");
const ScriptRoute = express_1.Router();
ScriptRoute.post("/create", (req, res) => {
    Create_1.createScript(req, res);
});
ScriptRoute.delete("/delete", (req, res) => {
    Delete_1.deleteScript(req, res);
});
ScriptRoute.put("/update", (req, res) => {
    Update_1.updateScript(req, res);
});
ScriptRoute.get("/get-all", (req, res) => {
    GetAll_1.getAllScript(req, res);
});
exports.default = ScriptRoute;
