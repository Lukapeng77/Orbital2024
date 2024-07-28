import { io } from "socket.io-client";
import { BASE_URL } from "../config";
import { isLoggedIn } from "./authHelper";

export let socket;

export const initiateSocketConnection = () => {
  const user = isLoggedIn();

  socket = io(BASE_URL, {
    auth: {
      token: user && user.token,
    },
      transports: ['websocket'],
  });
  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message); // Log connection errors
  });
  
  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO server");
});
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
