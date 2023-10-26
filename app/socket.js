import { io } from "socket.io-client";

const token = localStorage.getItem("token");

export const socket = io(`http://localhost:3003/chat?token=${token}`, {
  autoConnect: false,
});
