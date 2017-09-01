let socket = io(); //makes a request from the client to the server to open a websocket

socket.on("connect", function() {
  console.log("Connected to server");

});

socket.on("disconnect", function() {
  console.log("Disconected from server");
});

socket.on("newMessage", function(message) {
  let ol = $("#message-display");
  let li = $(`<li>${message.from}: ${message.text}</li>`);
  ol.append(li);
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

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    return alert("Could not fetch position");
  });
});

