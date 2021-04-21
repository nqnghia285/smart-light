import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { address } from "ip";
import path from "path";
import { route, setup } from "config-express-app";
import io, { createNamespace, initIO } from "setup-socket.io";
import RootRoute from "./api";
import { clientHandler, ioHandler } from "./events";
import { ServerEvent } from "./interface";

dotenv.config();

const PORT = parseInt(process.env.PORT || "5000", 10);
const ORIGIN = process.env.ORIGIN || "*";
const HOST_NAME = process.env.HOST_NAME || "0.0.0.0";

const API_PATH = process.env.API_PATH || "/api";

export const app = express();
const server = createServer(app);

/////////////////////////////////////////////////////
// Init io
initIO(server, ORIGIN);

// Create client namespace
export const client = createNamespace("/client");

// IO handler
ioHandler(io);

// Client handler
clientHandler(client);

// setInterval(() => {
//     io.emit(ServerEvent.SERVER_SEND_MESSAGE, "Hi Controller!");
//     client.emit(ServerEvent.SERVER_SEND_MESSAGE, "Hi Client!");
// }, 2000);

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
