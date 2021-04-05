import { Server } from "http";
import socketio, { Namespace } from "socket.io";
import socketIoCookieParser, { parser } from "../socket.io-cookie-parser";

const io = new socketio.Server();

export function initIO(server: Server, origin: string): socketio.Server {
    io.attach(server, {
        cors: {
            origin: [origin],
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
            credentials: true,
        },
    });

    io.use(socketIoCookieParser());

    return io;
}

export function createNamespace(nsp: string): Namespace {
    return io.of(nsp, parser());
}

export default io;
