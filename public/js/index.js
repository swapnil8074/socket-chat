var socket = io();
socket.on("connect", function() {
  console.log("welcome to chat app");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(msg) {
  $(".allMessages").append(
    '<div class="msg"><span class="from">' +
      msg.from +
      ': </span><span class="msgText">' +
      msg.text +
      "</span></div>"
  );
});

socket.on("newUser", function(user) {
  console.log(user.text);
});

$("#chatForm").on("submit", function(e) {
  var userName = $(".userName").val();
  var msgText = $("input[name=message]").val();
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: userName.trim() == "" ? "Anonymous" : userName,
      text: $("input[name=message]").val()
    },
    function() {
      //   this is acknowledgement function
    }
  );
  $(".allMessages").append(
    '<div class="msg"><span class="from">' +
      userName +
      ': </span><span class="msgText">' +
      msgText +
      "</span></div>"
  );
  $("input[name=message]").val("");
});
