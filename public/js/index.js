let socket = io(); //makes a request from the client to the server to open a websocket

socket.on("connect", function() {
  console.log("Connected to server");

});

socket.on("disconnect", function() {
  console.log("Disconected from server");
});

socket.on("newMessage", function(message) {
  let timeStamp = moment(message.createdAt).format("h:mm a");
  let template = $("#message-template").html();

  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: timeStamp
  });

  $("#message-display").append(html);
});

socket.on("newLocationMessage", function(message) {
  let timeStamp = moment(message.createdAt).format("h:mm a");
  let template = $("#location-message-template").html();

  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: timeStamp
  });

  $("#message-display").append(html);
});


let messageTextbox = $("input[name=message]");

$("#message-form").on("submit", function(e) {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val("").focus();
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
    }, function() {
      messageTextbox.focus();
    });
  }, function() {
    locationButton.removeAttr("disabled").text("Send Location");
    return alert("Could not fetch position");
  });
});

