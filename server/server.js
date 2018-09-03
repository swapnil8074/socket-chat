const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

const app = express();
var server = http.createServer(app);
var io = socketIO(server);
const { generateMessage } = require("./utils/message");

app.use(express.static(publicPath));

io.on("connection", socket => {
  // emit new user joined
  socket.emit(generateMessage("Admin", "Welcome to the Chat app"));
  socket.broadcast.emit("newUser", generateMessage("Admin", "New User joined"));

  socket.on("createMessage", msg => {
    socket.broadcast.emit("newMessage", {
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
