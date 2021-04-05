import { Request, Response, Router } from "express";
import { createController } from "./functions/Create";
import { deleteController } from "./functions/Delete";
import { getAllController } from "./functions/GetAll";
import { updateController } from "./functions/Update";

const ControllerRoute = Router();

// Create
ControllerRoute.post("/create", (req: Request, res: Response) => {
    createController(req, res);
});

// Update
ControllerRoute.put("/update", (req: Request, res: Response) => {
    updateController(req, res);
});

// Delete
ControllerRoute.delete("/delete", (req: Request, res: Response) => {
    deleteController(req, res);
});

// Get all
ControllerRoute.get("/get-all", (req: Request, res: Response) => {
    getAllController(req, res);
});

export default ControllerRoute;
