const moment = require("moment");


let generateUser = (id, name, room) => {
  return {
    id,
    name: name,
    room: room.toLowerCase(),
    joinedAt: moment().valueOf()
  };
};

module.exports = {generateUser};