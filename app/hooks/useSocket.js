"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data")).token
      : "";
    console.log("userdata", JSON.parse(localStorage.getItem("user_data")));
    const socket = io(`http://localhost:3003/chat?token=${token}`);

    function onConnect() {
      console.log("Connected to socket");
      setSocket(socket);
      setIsConnected(true);
    }

    console.log("Testing");

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  return { socket, isConnected };
}
