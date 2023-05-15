const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { PeerServer } = require("peer");

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
let videoRooms = {};

app.get("/", (req, res) => {
  res.send("Hello server is started");
});

io.on("connection", (socket) => {
  console.log(`user connected of the id: ${socket.id}`);
  socket.on("user-login", (data) => loginEventHandler(socket, data));

  socket.on("video-room-create", (data) =>
    videoRoomCreateHandler(socket, data)
  );

  socket.on("video-room-join", (data) => {
    videoRoomJoinHandler(socket, data);
  });

  socket.on("video-room-leave", (data) => {
    videoRoomLeaveHandler(socket, data);
  });

  socket.on("disconnect", () => {
    disconnectEventHandler(socket);
  });
});

const peerServer = PeerServer({ port: 9000, path: "/peer" });

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
const videoRoomCreateHandler = (socket, data) => {
  const { peerId, newRoomId } = data;

  // adding new room
  videoRooms[newRoomId] = {
    participants: [
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ],
  };

  broadcastVideoRooms();
  console.log("new room", data);
};
const videoRoomJoinHandler = (socket, data) => {
  const { roomId, peerId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((participant) => {
      socket.to(participant.socketId).emit("video-room-init", {
        newParticipantPeerId: peerId,
      });
    });

    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ];
  }

  broadcastVideoRooms();
};
const videoRoomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
      (p) => p.socketId !== socket.id
    );
  }

  if (videoRooms[roomId].participants.length > 0) {
    // emit an event to the user which is in the room that he should also close his peer conection
    socket
      .to(videoRooms[roomId].participants[0].socketId)
      .emit("video-call-disconnect");
  }

  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  }

  broadcastVideoRooms();
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
const broadcastVideoRooms = () => {
  io.to("logged-users").emit("video-rooms", videoRooms);
};
