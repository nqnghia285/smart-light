import { ioListener } from "./io";
import { clientListener } from "./client";
import { Namespace, Server } from "socket.io";

export function ioHandler(io: Server) {
    ioListener(io);
}
export function clientHandler(client: Namespace) {
    clientListener(client);
}
