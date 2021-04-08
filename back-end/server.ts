import dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as http from "http";
import { address } from "ip";
import path from "path";
import { route, setup } from "./@types/setup-express-app";
import io, { createNamespace, initIO } from "./@types/socket.io";
import RootRoute from "./api";
import { clientHandler, ioHandler } from "./events";

dotenv.config();

const PORT = parseInt(process.env.PORT || "5000", 10);
const ORIGIN = process.env.ORIGIN || "*";
const HOST_NAME = process.env.HOST_NAME || "0.0.0.0";

const API_PATH = process.env.API_PATH || "/api";

export const app = express();
const server = http.createServer(app);

/////////////////////////////////////////////////////
// Init io
initIO(server, ORIGIN);

// Create client namespace
const client = createNamespace("/client");

// IO handler
ioHandler(io);

// Client handler
clientHandler(client);

/////////////////////////////////////////////////////
// Setup Express app
setup(app, __dirname, ORIGIN);

// Routing
// Home page
app.get("/", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

route(app, API_PATH, RootRoute);

// Server is listening clients
server.listen(PORT, HOST_NAME, () => {
    let announcement = {
        server: server.address(),
        address: address(),
        message: "Server is running!",
    };
    console.log(announcement);
});
