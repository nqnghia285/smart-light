import io from "socket.io-client";

// const url = process.env.URL || "https://smartlightheroku.herokuapp.com/client";
// const url = process.env.URL || "https://smartlightheroku.herokuapp.com";
// const url = process.env.URL || "http://localhost:5000/client";
const url = process.env.URL || "http://localhost:5000";

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
