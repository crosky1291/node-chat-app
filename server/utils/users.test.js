const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.rooms = {
      test1: 2, 
      test2: 1
    };
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

  it("should add a room", () => {
    var room = "test5";
    users.addRoom(room);

    expect(users.rooms).toEqual({
      test1: 2, 
      test2: 1,
      test5: 1
    });
  });

  it("should add a participant to a room", () => {
    var room = "test1";
    users.addParticipantToRoom(room);

    expect(users.rooms).toEqual({
      test1: 3, 
      test2: 1,
    });
  });

  it("should remove participant from room", () => {
    var room = "test1";
    users.removeParticipantFromRoom(room);

    expect(users.rooms).toEqual({
      test1: 1, 
      test2: 1,
    });
  });

  it("should remove room if participant count reaches 0", () => {
    var room = "test2";
    users.removeParticipantFromRoom(room);

    expect(users.rooms).toEqual({
      test1: 2
    });
  });

  it("should return true if room is already taken", () => {
    var room = "test1";

    expect(users.isRoomTaken(room)).toBeTruthy();
  });




});