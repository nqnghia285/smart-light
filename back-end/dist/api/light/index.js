"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Create_1 = require("./functions/Create");
const Delete_1 = require("./functions/Delete");
const GetAll_1 = require("./functions/GetAll");
const Update_1 = require("./functions/Update");
const LightRoute = express_1.Router();
LightRoute.post("/create", (req, res) => {
    Create_1.createLight(req, res);
});
LightRoute.delete("/delete", (req, res) => {
    Delete_1.deleteLight(req, res);
});
LightRoute.put("/update", (req, res) => {
    Update_1.updateLight(req, res);
});
LightRoute.get("/get-all", (req, res) => {
    GetAll_1.getAllLight(req, res);
});
exports.default = LightRoute;
