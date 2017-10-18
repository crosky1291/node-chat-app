
//addUser(id, name, room)
//removeUser(id)
//getUser(is);
//getUserList(room);

class Users {
  constructor() {
    this.users = [];
    this.rooms = [];
  }

  addUser(user) {
    this.users.push(user);
    return user;
  }

  addRoom(room) {
    this.rooms.push(room);
    return room;
  }

  findRoom(name) {
    return this.rooms.filter((roomName) => {
      return roomName.toLowerCase() === name.toLowerCase();
    })[0];
  }

  getRoomList() {
    return this.rooms;
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

  isRoomTaken(roomName) {
    var isTaken = false;
    this.rooms.forEach(function(room) {
      if(roomName.toLowerCase() === room.toLowerCase()) isTaken = true;
    });

    return isTaken;
  }

  getUserList(room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });

    return users;
  }
}

module.exports = {Users};