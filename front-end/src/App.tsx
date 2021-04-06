import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axiosCient from "./connections/axiosClient";
import { socketIoClient } from "./connections/socketIoClient";

function App() {
    function login() {
        axiosCient
            .post("/user/login", { email: "admin@gmail.com", password: "123456" })
            .then((res) => {
                console.log("Server says: ", res);
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    }

    function send() {
        socketIoClient.emit("client-send-message", "Hello Server!");
    }

    function connect() {
        socketIoClient.emit("controller-connect", { code: "ESP-12E" });
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <button onClick={login}>Login</button>
                <button onClick={send}>Send</button>
                <button onClick={connect}>Connect</button>
            </header>
        </div>
    );
}

export default App;
