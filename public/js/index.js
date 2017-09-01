let socket = io(); //makes a request from the client to the server to open a websocket

socket.on("connect", function() {
  console.log("Connected to server");

});

socket.on("disconnect", function() {
  console.log("Disconected from server");
});

socket.on("newMessage", function(message) {
  console.log(message);
});

