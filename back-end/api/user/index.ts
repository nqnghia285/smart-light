import { Request, Response, Router } from "express";
import { createUser } from "./functions/Create";
import { deleteUser } from "./functions/Delete";
import { getAllUser } from "./functions/GetAll";
import { login } from "./functions/Login";
import { updateUser } from "./functions/Update";

const UserRoute = Router();

// Login
UserRoute.post("/login", (req: Request, res: Response) => {
    login(req, res);
});

// Create
UserRoute.post("/create", (req: Request, res: Response) => {
    createUser(req, res);
});

// Update
UserRoute.put("/update", (req: Request, res: Response) => {
    updateUser(req, res);
});

// Delete
UserRoute.delete("/delete", (req: Request, res: Response) => {
    deleteUser(req, res);
});

// Get all
UserRoute.get("/get-all", (req: Request, res: Response) => {
    getAllUser(req, res);
});

export default UserRoute;
