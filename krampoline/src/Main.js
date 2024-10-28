import { useState } from 'react';
import './App.css';
import { instance } from "./api.js";

function Main() {
  const [apiTest, setApiTest] = useState(false);
  const [dbTest, setDbTest] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleApiOnClick = async () => {
    try {
      await instance.get("/test");
      setApiTest(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDbOnClick = async () => {
    try {
      await instance.get("/db");
      setDbTest(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAiGenerate = async () => {
    try {
      const response = await instance.get("/ai/generate", {
        params: { message: "Tell me a joke" },
      });
      setAiResponse(response.data.generation);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Hello Krampoline!
        </div>
        <div>
          <button onClick={handleApiOnClick}>API TEST</button>
          <div>{apiTest ? "CONNECT" : "NOT YET"}</div>
        </div>
        <div>
          <button onClick={handleDbOnClick}>DB TEST</button>
          <div>{dbTest ? "CONNECT" : "NOT YET"}</div>
        </div>
        <div>
          <button onClick={handleAiGenerate}>AI Generate</button>
          <div>{aiResponse || "Waiting for response..."}</div>
        </div>
      </header>
    </div>
  );
}

export default Main;