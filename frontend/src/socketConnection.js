import io from "socket.io-client";
import { onlineUsersHandler } from "./app/actions/userActions";

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io("http://localhost:3005");

  socket.on("connect", () => {
    console.log("connected to socket server");
  });

  socket.on("online-users", (usersData) => {
    onlineUsersHandler(socket.id, usersData);
  });
};

export const login = (data) => {
  socket.emit("user-login", data);
};
