const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.rooms = ["Test1", "Test2"];
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

    var resUser = users.addUser(user);
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

  it("should find user by id", () => {
    var userId = "2";
    var user = users.getUserById(userId);

    expect(user.id).toBe(userId);
  });

  it("should NOT find user by id ", () => {
    var userId = "60";
    var user = users.getUserById(userId);

    expect(user).toNotExist();
  });

  it("should return names for Test1", () => {
    var userList = users.getUserList("Test1");
    expect(userList).toEqual([{
      id: "1",
      name: "luis",
      room: "Test1"
    },
    {
      id: "3",
      name: "Jacob",
      room: "Test1"
    }]);
  });

  it("should return true if name is already in use in a room", () => {
    var name = "jacob";
    var room = "Test1";

    expect(users.isNameTaken(name, room)).toBeTruthy();
  });

  it("should return true if room is already taken", () => {
    var room = "TESt1";

    expect(users.isRoomTaken(room)).toBeTruthy();
  });


});