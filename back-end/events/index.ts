import { Namespace, Server } from "socket.io";
import { clientListener } from "./client";
import { ioListener } from "./io";

export function ioHandler(io: Server) {
    ioListener(io);
}
export function clientHandler(client: Namespace) {
    clientListener(client);
}
