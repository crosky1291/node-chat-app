class Users {
  constructor() {
    this.users = [];
    this.rooms = {};
  }

  addUser(user) {
    this.users.push(user);
    return user;
  }

  addRoom(roomName) { //creates a room with 1 participant
    this.rooms[roomName] = 1;
  }

  addParticipantToRoom(roomName) { //increments participant count when other users join
    this.rooms[roomName]++;
  }

  removeParticipantFromRoom(roomName) { //decrement participant count
    this.rooms[roomName]--;
  
    if (this.rooms[roomName] === 0) { //deletes room automatically if all participants leave
      this.deleteRoom(roomName);
    }
  }

  deleteRoom(roomName) {
    delete this.rooms[roomName];
  }

  getRoomList() {
    return this.rooms;
  }

  isRoomTaken(roomName) {
    return this.rooms.hasOwnProperty(roomName);
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

module.exports = { Users };