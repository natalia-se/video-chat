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

app.get("/", (req, res) => {
  res.send("Hello server is started");
});

io.on("connection", (socket) => {
  console.log(`user connected of the id: ${socket.id}`);
  socket.on("user-login", (data) => console.log("server", data));
});

const PORT = process.env.PORT || 3005;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
