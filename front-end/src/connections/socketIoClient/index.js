import { io } from "socket.io-client";

const url = process.env.URL || "http://localhost:5000";

export const socketIoClient = io(url, { withCredentials: true });

socketIoClient.on("server-send-ack-connection", (message) => {
    console.log("Server says:", message);
});

socketIoClient.on("server-send-message", (message) => {
    console.log("Server says:", message);
});

socketIoClient.on("server-send-ack-controller-connect", (message) => {
    console.log("Server says:", message);
});
