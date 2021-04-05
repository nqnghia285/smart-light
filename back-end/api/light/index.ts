import { Request, Response, Router } from "express";
import { createLight } from "./functions/Create";
import { deleteLight } from "./functions/Delete";
import { getAllLight } from "./functions/getAll";
import { updateLight } from "./functions/Update";

const LightRoute = Router();

// Create
LightRoute.post("/create", (req: Request, res: Response) => {
    createLight(req, res);
});

// Delete
LightRoute.delete("/delete", (req: Request, res: Response) => {
    deleteLight(req, res);
});

// Update
LightRoute.put("/update", (req: Request, res: Response) => {
    updateLight(req, res);
});

// Get all
LightRoute.get("/get-all", (req: Request, res: Response) => {
    getAllLight(req, res);
});

export default LightRoute;
