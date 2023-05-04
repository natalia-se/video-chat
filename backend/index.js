const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello server is started");
});

const PORT = process.env.PORT || 3005;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
