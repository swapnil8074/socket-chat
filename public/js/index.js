var socket = io();
socket.on("connect", function() {
  console.log("user connected");

  socket.emit("createMessage", {
    from: "Swapnil",
    text: "yup! that works from me!"
  });
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(msg) {
  console.log("New Message", msg);
});
