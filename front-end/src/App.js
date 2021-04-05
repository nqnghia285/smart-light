import "./App.css";
import axiosCient from "./connections/axiosClient";
import { socketIoClient } from "./connections/socketIoClient";
import logo from "./logo.svg";
import config from "./config.json";

function App() {
    function sendMessage() {
        socketIoClient.emit("client-send-message", "Hello Server!");
    }

    function login() {
        axiosCient.post(config.baseUrl + "/api/user/login", { email: "admin@gmail.com", password: "123456" });
    }

    function controllerConnect() {
        socketIoClient.emit("controller-connect", { code: "ESP-12E" });
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <button onClick={controllerConnect}>Connect</button>
                <button onClick={login}>Login</button>
                <button onClick={sendMessage}>Send</button>
            </header>
        </div>
    );
}

export default App;
