const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: "1",
      name: "luis",
      room: "Test1"
    }, {
      id: "2",
      name: "Yandri",
      room: "Test2"
    }, {
      id: "3",
      name: "Jacob",
      room: "Test1"
    }];
  });

  it("should add new user", () => {
    var users = new Users();
    var user = {
      id: "123",
      name: "Yandri",
      room: "Test"
    };

    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    var userId = "2";
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it("should NOT remove a user", () => {
    var userId = "23";
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it("should find user", () => {
    var userId = "2";
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it("should NOT find user", () => {
    var userId = "60";
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it("should return names for Test1", () => {
    var userList = users.getUserList("Test1");
    expect(userList).toEqual(["luis", "Jacob"]);
  });


});