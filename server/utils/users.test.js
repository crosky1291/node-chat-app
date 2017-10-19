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
    let users = new Users();
    let user = {
      id: "123",
      name: "Yandri",
      room: "Test"
    };
    let resUser = users.addUser(user);

    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    let userId = "2";
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it("should NOT remove a user", () => {
    let userId = "23";
    let user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it("should find user by id", () => {
    let userId = "2";
    let user = users.getUserById(userId);

    expect(user.id).toBe(userId);
  });

  it("should NOT find user by id ", () => {
    let userId = "60";
    let user = users.getUserById(userId);

    expect(user).toNotExist();
  });

  it("should return names for Test1", () => {
    let userList = users.getUserList("Test1");

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
    let name = "jacob";
    let room = "Test1";

    expect(users.isNameTaken(name, room)).toBeTruthy();
  });

  it("should add a room", () => {
    let room = "test5";
    users.addRoom(room);

    expect(users.rooms).toEqual({
      test1: 2, 
      test2: 1,
      test5: 1
    });
  });

  it("should add a participant to a room", () => {
    let room = "test1";
    users.addParticipantToRoom(room);

    expect(users.rooms).toEqual({
      test1: 3, 
      test2: 1,
    });
  });

  it("should remove participant from room", () => {
    let room = "test1";
    users.removeParticipantFromRoom(room);

    expect(users.rooms).toEqual({
      test1: 1, 
      test2: 1,
    });
  });

  it("should remove room if participant count reaches 0", () => {
    let room = "test2";
    users.removeParticipantFromRoom(room);

    expect(users.rooms).toEqual({
      test1: 2
    });
  });

  it("should return true if room is already taken", () => {
    let room = "test1";

    expect(users.isRoomTaken(room)).toBeTruthy();
  });
});