import { Router } from "express";
import ControllerRoute from "./controller";
import LightRoute from "./light";
import RoomRoute from "./room";
import ScriptRoute from "./script";
import UserRoute from "./user";

const RootRoute = Router();

// User route
RootRoute.use("/user", UserRoute);

// Controler route
RootRoute.use("/controller", ControllerRoute);

// Script route
RootRoute.use("/script", ScriptRoute);

// Room route
RootRoute.use("/room", RoomRoute);

// Light route
RootRoute.use("/light", LightRoute);

export default RootRoute;
