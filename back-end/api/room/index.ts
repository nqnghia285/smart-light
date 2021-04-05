import { Request, Response, Router } from "express";
import { createRoom } from "./functions/Create";
import { deleteRoom } from "./functions/Delete";
import { getAllRoom } from "./functions/GetAll";
import { updateRoom } from "./functions/Update";

const RoomRoute = Router();

// Create
RoomRoute.post("/create", (req: Request, res: Response) => {
    createRoom(req, res);
});

// Delete
RoomRoute.delete("/delete", (req: Request, res: Response) => {
    deleteRoom(req, res);
});

// Update
RoomRoute.put("/update", (req: Request, res: Response) => {
    updateRoom(req, res);
});

// Get all
RoomRoute.get("/get-all", (req: Request, res: Response) => {
    getAllRoom(req, res);
});

export default RoomRoute;
