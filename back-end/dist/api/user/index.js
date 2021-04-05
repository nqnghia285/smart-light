"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Create_1 = require("./functions/Create");
const Delete_1 = require("./functions/Delete");
const GetAll_1 = require("./functions/GetAll");
const Login_1 = require("./functions/Login");
const Update_1 = require("./functions/Update");
const UserRoute = express_1.Router();
UserRoute.post("/login", (req, res) => {
    Login_1.login(req, res);
});
UserRoute.post("/create", (req, res) => {
    Create_1.createUser(req, res);
});
UserRoute.put("/update", (req, res) => {
    Update_1.updateUser(req, res);
});
UserRoute.delete("/delete", (req, res) => {
    Delete_1.deleteUser(req, res);
});
UserRoute.get("/get-all", (req, res) => {
    GetAll_1.getAllUser(req, res);
});
exports.default = UserRoute;
