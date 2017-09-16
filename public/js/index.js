let socket = io(); //makes a request from the client to the server to open a websocket

socket.on("connect", function() {
  console.log("Connected to server");

});

socket.on("disconnect", function() {
  console.log("Disconected from server");
});

socket.on("newMessage", function(message) {
  let timeStamp = moment(message.createdAt).format("h:mm a");
  let ol = $("#message-display");
  let li = $(`<li>${message.from} ${timeStamp}: ${message.text}</li>`);
  ol.append(li);
});

socket.on("newLocationMessage", function(message) {
  let timeStamp = moment(message.createdAt).format("h:mm a");
  let li = $(`<li>${message.from} ${timeStamp}: </li>`);
  let a = $(`<a href=${message.url} target="_blank">My Current Location</a>`);
  li.append(a);
  $("#message-display").append(li);
});

$("#message-form").on("submit", function(e) {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: $("input[name=message]").val()
  });
});

let locationButton = $("#send-location");

locationButton.on("click", function() {
  if(!navigator.geolocation) {
    return alert("Your browser does not support Locations Services");
  }

  locationButton.attr("disabled", "disabled").text("Sending Location...");

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr("disabled").text("Send Location");
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr("disabled").text("Send Location");
    return alert("Could not fetch position");
  });
});

