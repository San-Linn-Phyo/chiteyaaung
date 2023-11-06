"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserProvider";
import { io } from "socket.io-client";

export const SocketContext = createContext(undefined);

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(undefined);
  const [isConnected, setIsConnected] = useState(undefined);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser || socket) return;

    const websocket = io(
      `http://localhost:3003/chat?token=${currentUser.token}`
    );

    function onConnect() {
      setSocket(websocket);
      setIsConnected(true);
    }

    websocket.on("connect", onConnect);

    return () => {
      websocket.off("connect", onConnect);
    };
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
