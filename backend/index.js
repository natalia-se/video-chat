const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = {};

app.get("/", (req, res) => {
  res.send("Hello server is started");
});

io.on("connection", (socket) => {
  console.log(`user connected of the id: ${socket.id}`);
  socket.on("user-login", (data) => loginEventHandler(socket, data));
  socket.on("disconnect", () => {
    disconnectEventHandler(socket);
  });
});

const PORT = process.env.PORT || 3005;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Socket events

const loginEventHandler = (socket, data) => {
  socket.join("logged-users");

  onlineUsers[socket.id] = {
    username: data.username,
  };
  console.log(onlineUsers);

  io.to("logged-users").emit("online-users", convertOnlineUsersToArray());
};

const disconnectEventHandler = (socket) => {
  console.log(`user disconnected of the id: ${socket.id}`);
  removeOnlineUser(socket.id);
};

// Help functions
const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
  console.log(onlineUsers);
};

const convertOnlineUsersToArray = () => {
  const onlineUsersArray = [];

  Object.entries(onlineUsers).forEach(([key, value]) => {
    onlineUsersArray.push({
      socketId: key,
      username: value.username,
    });
  });

  return onlineUsersArray;
};
