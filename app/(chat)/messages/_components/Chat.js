"use client";

import MessagesHistory from "@/app/(chat)/messages/[uid]/_components/MessagesHistory";
import { useSocket } from "@/app/(chat)/messages/[uid]/_hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/app/(chat)/messages/[uid]/_hooks/useLocalStorage";

export default function Chat({ uid }) {
  const { socket, isConnected } = useSocket();
  const { get } = useLocalStorage();
  const currentUID = get("uid");
  const [loadMessages, setLoadMessages] = useState([]);
  const messageInputRef = useRef(null);

  function sentAMessage(message) {
    const msg = {
      message: messageInputRef.current.value,
      from: currentUID,
      to: uid,
    };
    socket.emit("messageFromClient", msg);
  }

  function clearMessageInput() {
    messageInputRef.current.value = "";
  }

  function onMessageFormSubmit(event) {
    event.preventDefault();
    const message = messageInputRef.current.value;
    sentAMessage(message);
    clearMessageInput();
  }

  useEffect(() => {
    if (!socket) return;

    function onLoadedMessage(messages) {
      setLoadMessages(() => messages);
    }

    function onMessage(message) {
      setLoadMessages((prev) => [...prev, message]);
    }

    socket.emit("loadmessage");
    socket.on("loadmessage", onLoadedMessage);
    socket.on("message", onMessage);

    return () => {
      socket.off("loadmessage", onLoadedMessage);
      socket.off("message", onMessage);
    };
  }, [socket]);

  return (
    <div className="bg-secondary px-4 h-screen">
      <div className="flex-grow max-  h-[88%] overflow-auto">
        <MessagesHistory messages={loadMessages} from={get("uid")} />
      </div>

      <div className="py-6">
        <form onSubmit={onMessageFormSubmit}>
          <input
            ref={messageInputRef}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full"
          />
        </form>
      </div>
    </div>
  );
}
