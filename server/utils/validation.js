let isRealString = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};

let capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {isRealString, capitalize};
