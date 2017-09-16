const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const port = process.env.PORT || 3000;
const { generateMessage, generateLocationMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
  socket.broadcast.emit("newMessage", generateMessage("Admin", "New User Has Joined"));

  socket.on("createMessage", (message, callback) => {
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });

  socket.on("createLocationMessage", (coords, callback) => {
    io.emit("newLocationMessage", generateLocationMessage("User", coords.latitude, coords.longitude));
    callback();
  });

});



server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



