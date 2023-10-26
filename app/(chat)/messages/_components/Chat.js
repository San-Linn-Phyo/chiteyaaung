"use client";

import { useEffect, useState } from "react";
import { socket } from "@/app/socket";

export default function Chat({ uid }) {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messagesHistory, setMessagesHistory] = useState([]);

  function onSubmit(e) {
    e.preventDefault();
    if (isConnected) {
      console.log("Send a message");
      const data = {
        to: uid,
        from: localStorage.getItem("uid"),
        message: message,
      };
      socket.emit("messageFromClient", data);
      socket.on("message", (message) =>
        setMessagesHistory([...messagesHistory, message]),
      );
    }
  }

  console.log("messagesHistory: ", messagesHistory);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    socket.connect();
    socket.on("connect", onConnect);

    return () => socket.off("connect", onConnect);
  }, []);

  return (
    <div className="bg-secondary px-4 flex flex-col">
      <div className="flex-grow">
        {messagesHistory.map((history) => {
          if (history.from._id === localStorage.getItem("uid")) {
            return (
              <div className="chat chat-end" key={history._id}>
                <div className="chat-bubble">{history.message}</div>
              </div>
            );
          }

          return (
            <div className="chat chat-start" key={history._id}>
              <div className="chat-bubble">{history.message}</div>
            </div>
          );
        })}
      </div>
      <div className="py-6">
        <form onSubmit={onSubmit}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full"
          />
        </form>
      </div>
    </div>
  );
}
