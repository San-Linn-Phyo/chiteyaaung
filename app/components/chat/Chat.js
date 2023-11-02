"use client";
import { useState, useRef, useEffect } from "react";
import { useSocket } from "@/app/hooks/useSocket";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import MessagesHistory from "@/app/components/chat/MessagesHistory";
import Greeting from "@/app/assets/icons/Greeting";

export default function Chat({ user }) {
  const messageInputRef = useRef(null);
  const { socket } = useSocket();
  const [loadMessages, setLoadMessages] = useState([]);
  const { get } = useLocalStorage();
  const currentUID = get("user_data")
    ? JSON.parse(get("user_data"))._id
    : undefined;

  function sentAMessage(message) {
    const msg = {
      message: messageInputRef.current.value,
      from: currentUID,
      to: user._id,
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

  console.log("Messages", loadMessages);

  useEffect(() => {
    console.log("Socket: ", socket);
    if (!socket) return;

    function onLoadedMessage(messages) {
      setLoadMessages(() => messages);
    }

    function onMessage(message) {
      setLoadMessages((prev) => [...prev, message]);
    }

    socket.emit("loadmessage", { to: user._id });
    socket.on("loadmessage", onLoadedMessage);
    socket.on("message", onMessage);

    return () => {
      socket.off("loadmessage", onLoadedMessage);
      socket.off("message", onMessage);
    };
  }, [socket]);

  return (
    <div className="w-4/5 mx-auto bg-accent rounded-lg h-full max-h-full overflow-auto">
      <div className="p-4 shadow sticky top-0">
        <div className="flex items-center">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <img src={user.image} alt={user.name} />
            </div>
          </div>
          <span className="ms-4">{user.name}</span>
        </div>
      </div>

      <div
        className="relative overflow-auto px-4 h-full pt-4"
        style={{ maxHeight: "calc(100% - 176px)" }}
      >
        {!loadMessages.length ? (
          <div className="grid items-center justify-center h-full">
            <Greeting />
          </div>
        ) : (
          <div className="max-h-full">
            {currentUID && (
              <MessagesHistory messages={loadMessages} from={currentUID} />
            )}
          </div>
        )}
      </div>

      <div className="py-6 px-4">
        <form onSubmit={onMessageFormSubmit}>
          <input
            ref={messageInputRef}
            type="text"
            placeholder="Type a message"
            className="input input-bordered input-primary w-full"
          />
        </form>
      </div>
    </div>
  );
}
