import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await axios.post(
      "http://localhost:8000/api/chat",
      {
        message,
      }
    );

    setResponse(res.data.response);
  };

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