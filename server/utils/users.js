
//addUser(id, name, room)
//removeUser(id)
//getUser(is);
//getUserList(room);

class Users {
  constructor() {
    this.users = [];
    this.rooms = {};
  }

  addUser(user) {
    this.users.push(user);
    return user;
  }

  addRoom(roomName) {
    roomName = roomName.toLowerCase();
    this.rooms[roomName] = 1;
  }

  addParticipantToRoom(roomName) {
    roomName = roomName.toLowerCase();
    this.rooms[roomName]++;
  }

  removeParticipantFromRoom(roomName) {
    roomName = roomName.toLowerCase();
    this.rooms[roomName]--;
  
    if (this.rooms[roomName] === 0) {
      this.deleteRoom(roomName);
    }
  }

  deleteRoom(roomName) {
    roomName = roomName.toLowerCase();
    delete this.rooms[roomName];
  }

  getRoomList() {
    return this.rooms;
  }

  isRoomTaken(roomName) {
    roomName = roomName.toLowerCase();
    return this.rooms.hasOwnProperty(roomName);

    // var isTaken = false;
    // this.rooms.forEach(function(room) {
    //   if(roomName.toLowerCase() === room.toLowerCase()) isTaken = true;
    // });

    // return isTaken;
  }

  removeUser(id) {
    var user = this.getUserById(id);

    if (user) {
      this.users = this.users.filter((user) => {
        return user.id !== id;
      });
    }

    return user;
  }

  getUserById(id) {
    return this.users.filter((user) => {
      return user.id === id;
    })[0];
  }

  isNameTaken(name, room) {
    let users = this.getUserList(room);
    
    return users.filter((user) => {
      return user.name.toLowerCase() === name.toLowerCase();
    })[0];

  }

  getUserList(room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });

    return users;
  }
}

module.exports = {Users};