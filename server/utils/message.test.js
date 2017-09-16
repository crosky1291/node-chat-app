const expect = require("expect");
let { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    let from = "Yandri Sanchez";
    let text = "The message......";
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({from, text});
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location message object", () => {
    let from = "Yandri";
    let latitude = 24;
    let longitude = 30;
    let url = "https://www.google.com/maps?q=24,30";
    let locationMessage = generateLocationMessage(from, latitude, longitude);

    expect(locationMessage.createdAt).toBeA("number");
    expect(locationMessage).toInclude({from, url});
  });
});