"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Create_1 = require("./functions/Create");
const Delete_1 = require("./functions/Delete");
const GetAll_1 = require("./functions/GetAll");
const Update_1 = require("./functions/Update");
const ControllerRoute = express_1.Router();
ControllerRoute.post("/create", (req, res) => {
    Create_1.createController(req, res);
});
ControllerRoute.put("/update", (req, res) => {
    Update_1.updateController(req, res);
});
ControllerRoute.delete("/delete", (req, res) => {
    Delete_1.deleteController(req, res);
});
ControllerRoute.get("/get-all", (req, res) => {
    GetAll_1.getAllController(req, res);
});
exports.default = ControllerRoute;
