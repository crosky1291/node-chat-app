const moment = require("moment");


let generateUser = (id, name, room) => {
  return {
    id,
    name,
    room,
    joinedAt: moment().valueOf()
  };
};

module.exports = {generateUser};