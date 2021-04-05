import { Request, Response, Router } from "express";
import { createScript } from "./functions/Create";
import { deleteScript } from "./functions/Delete";
import { getAllScript } from "./functions/GetAll";
import { updateScript } from "./functions/Update";

const ScriptRoute = Router();

// Create
ScriptRoute.post("/create", (req: Request, res: Response) => {
    createScript(req, res);
});

// Delete
ScriptRoute.delete("/delete", (req: Request, res: Response) => {
    deleteScript(req, res);
});

// Update
ScriptRoute.put("/update", (req: Request, res: Response) => {
    updateScript(req, res);
});

// Get all
ScriptRoute.get("/get-all", (req: Request, res: Response) => {
    getAllScript(req, res);
});

export default ScriptRoute;
