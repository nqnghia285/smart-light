"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Create_1 = require("./functions/Create");
const Delete_1 = require("./functions/Delete");
const GetAll_1 = require("./functions/GetAll");
const Update_1 = require("./functions/Update");
const RoomRoute = express_1.Router();
RoomRoute.post("/create", (req, res) => {
    Create_1.createRoom(req, res);
});
RoomRoute.delete("/delete", (req, res) => {
    Delete_1.deleteRoom(req, res);
});
RoomRoute.put("/update", (req, res) => {
    Update_1.updateRoom(req, res);
});
RoomRoute.get("/get-all", (req, res) => {
    GetAll_1.getAllRoom(req, res);
});
exports.default = RoomRoute;
