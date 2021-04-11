import { ioListener } from "./io";
import { clientListener } from "./client";

export function ioHandler(io: any) {
    ioListener(io);
}
export function clientHandler(client: any) {
    clientListener(client);
}
