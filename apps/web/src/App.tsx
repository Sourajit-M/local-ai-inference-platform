import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    setResponse("")

    const res = await fetch(
      "http://localhost:8000/api/chat/stream",
      {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }
    );

    const reader = res.body?.getReader()

    if(!reader) return;

    const decoder = new TextDecoder()

    while(true){
      const { done, value } = await reader.read()

      if(done) break;

      const chunk = decoder.decode(value)
      setResponse((prev) => prev+chunk)
    }
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
      }}
    >
      <h1>Local AI Inference Platform</h1>

      <textarea
        rows={5}
        style={{ width: "100%" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

      <pre>{response}</pre>
    </div>
  );
}

export default App;