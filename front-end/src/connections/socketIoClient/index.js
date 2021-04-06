import { io } from "socket.io-client";

const url = process.env.URL || "https://smartlightheroku.herokuapp.com";

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
