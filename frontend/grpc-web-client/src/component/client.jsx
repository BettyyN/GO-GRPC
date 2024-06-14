import React, { useState } from "react";
import { PingRequest } from "../proto/ping_pb";
import { PingServiceClient } from "../proto/ping_grpc_web_pb";

function Client() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handlePing = () => {
    const request = new PingRequest();
    request.setMessage(message);

    const client = new PingServiceClient("http://localhost:8081");

    client.ping(request, {}, (err, response) => {
      if (err) {
        console.error("Error:", err.message);
        return;
      }
      setResponse(response.getMessage());
    });
  };

  return (
    <div>
      <h2>Ping Client</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={handlePing}>Ping</button>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Client;
