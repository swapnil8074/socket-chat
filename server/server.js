const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New User connected");

  socket.on("createMessage", msg => {
    // broadcasting to everyone, using io
    io.emit("newMessage", {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });
  });

  // socket.emit("newMessage", {
  //   from: "swapnil",
  //   text: "comming from server"
  // });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(port, function() {
  console.log("server is running on port 3000");
});
