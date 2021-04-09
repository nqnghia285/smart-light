import io from "socket.io-client";

const url = process.env.URL || "https://smartlightheroku.herokuapp.com/client";

export const socketIoClient = io(url);

socketIoClient.on("server-send-ack-connection", (message: any) => {
    console.log("Server says:", message);
});

socketIoClient.on("server-send-message", (message: any) => {
    console.log("Server says:", message);
});

socketIoClient.on("server-send-ack-controller-connect", (message: any) => {
    console.log("Server says:", message);
});
