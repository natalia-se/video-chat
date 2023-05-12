import io from "socket.io-client";
import { onlineUsersHandler } from "./app/actions/userActions";
import { videoRoomsListHandler } from "./app/actions/videoRoomActions";

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io("http://localhost:3005");

  socket.on("connect", () => {
    console.log("connected to socket server");
  });

  socket.on("online-users", (usersData) => {
    onlineUsersHandler(socket.id, usersData);
  });
  socket.on("video-rooms", (videoRooms) => {
    videoRoomsListHandler(videoRooms);
  });
};

export const login = (data) => {
  socket.emit("user-login", data);
};

export const createVideoRoom = (data) => {
  console.log("emitting");
  socket.emit("video-room-create", data);
};
