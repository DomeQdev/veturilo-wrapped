import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import parser from "./parser";

function App() {
    const [count, setCount] = useState(0);

    console.log(
        parser({
            date: 1732616178000,
            action: '[Rental #261730570] e-SMARTbike 2.0 RFID "SWAP" 613839 until 11:36:56 (Krakowskie Przedmieście - Traugutta - Metro Centrum Nauki Kopernik) (reklamacja uznana przez chat) (sigma boy)',
            cost: -6,
        })
    );

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default App;
