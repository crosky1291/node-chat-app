
//addUser(id, name, room)
//removeUser(id)
//getUser(is);
//getUserList(room);

class Users {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => {
        return user.id !== id;
      });
    }

    return user;
  }

  getUser(id) {
    return this.users.filter((user) => {
      return user.id === id;
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