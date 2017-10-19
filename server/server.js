const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const port = process.env.PORT || 3000;
const { generateMessage, generateLocationMessage } = require("./utils/message");
const { generateUser } = require("./utils/user");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");

const publicPath = path.join(__dirname, "../public");
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users(); //initialize the users class

app.use(express.static(publicPath));

io.on("connection", (socket) => { //when a user connects give access to the web-socket object

  socket.on("disconnect", () => { //user disconnections
   
    var user = users.removeUser(socket.id); //removes returns the user if it was already in the chat room.
   
    if (user) {
      users.removeParticipantFromRoom(user.room); //decrements the count of users for that room.
      io.to(user.room).emit("updateUserList", users.getUserList(user.room)); //updates the list of users for the remaining users in the room
      io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`)); 
    }
  });

  socket.on("join", (params, callback) => { //when a user tries to join a chat room
    
    let isJoiningRoom = params.roomToJoin ? true : false; //check if its joining or creating a room
    let userRoom = isJoiningRoom ? params.roomToJoin.toLowerCase() : params.room.toLowerCase();

    if (isJoiningRoom) { //if user is joining
      if(!isRealString(params.name)) { //check name for real string
        return callback("Name is Required!");
      } else if (users.isNameTaken(params.name, userRoom)) { //check name to prevent duplicates
        return callback("Name is already in use, try again!");
      }

    } else { // do this when they are creating a room
      if(!isRealString(params.name) || !isRealString(params.room)) { //check for valid name/room strings
        return callback("Name and room are required!");
      } else if (users.isRoomTaken(userRoom)) { //check that the room name is not already taken
        return callback("Room name is already in use, try joining it!");
      }
    }

    let user = generateUser(socket.id, params.name, userRoom);
    
    socket.join(user.room); //puts the user in the room
    users.addUser(user); //adds the user to the list of users
    
    if (!users.isRoomTaken(user.room)) { //if room does not exits
      users.addRoom(user.room); //add the room to the list
    } else { //otherwise
      users.addParticipantToRoom(user.room); //increment participants count
    }

    io.to(user.room).emit("updateUserList", users.getUserList(user.room)); //update the list of users to everyone in the room

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app")); //emit this to the new user
    socket.broadcast.to(userRoom).emit("newMessage", generateMessage("Admin", `${user.name} has joined`)); //tell everyone else who just joined

    callback(); //return
  });

  socket.on("createMessage", (message, callback) => {
    var user = users.getUserById(socket.id); //grab user who is sending a message

    if(user && isRealString(message.text)) { //verify
      io.to(user.room).emit("newMessage", generateMessage(user.name, message.text)); //emit message to everyone in the room
    }
    
    callback(); //return
  });

  socket.on("createLocationMessage", (coords, callback) => {
    var user = users.getUserById(socket.id);

    if(user) {
      io.to(user.room).emit("newLocationMessage", generateLocationMessage(`${user.name}`, coords.latitude, coords.longitude));
    }
    
    callback();
  });
});

//route to grab all the rooms that are in use
app.get("/rooms", (req, res) => {
  let rooms = users.getRoomList();
  res.send(rooms);
});

//express server config
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});