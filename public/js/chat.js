let socket = io(); //makes a request from the client to the server to open a websocket

socket.on("connect", function() {
  console.log("Connected to server");

  let params = jQuery.deparam(window.location.search);

  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("everything was ok");
    }
  });
});

socket.on("disconnect", function() {
  console.log("Disconected from server");
});

socket.on("newMessage", function(message) {
  let timeStamp = moment(message.createdAt).format("h:mm A");
  let template = $("#message-template").html();

  let html = Mustache.render(template, {
    text: message.text,
    class: "chat-me",
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

socket.on("updateUserList", function(list) {
  let userList = $("#usernames");
  let template = $("#users-template").html();

  userList.empty();
  list.forEach(function(user) {
    let timeStamp = moment(user.joinedAt).format("h:mm A");

    let html = Mustache.render(template, {
      name: user.name,
      joinedAt: timeStamp
    });

    userList.append(html);
  });
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

// $("#input-holder i").on("click", function() {
//   console.log("hi");
// });

// $.get("/hello", function(data) {
//   console.log(data);
//   let emojiContainer = $("#emoji-container");
//   let path = "images/smileys";
//   data.forEach(function(file) {
//     let img = $(`<img class="emoji" src=${path}/${file}>`);
//     emojiContainer.append(img);
//   });
// });



$("#emoji-container").on("click", function(e) {
  let value = $(e.target).html();
  console.log(value);
  var input = $("#message-field");
  input.val(input.val() + value).focus();
});



function getPeopleEmoji() {
  let list = [
    '1f600', '1f601', '1f602', '1f603', '1f604', '1f605', '1f606','1f607', 
    '1f608', '1f609', '1f60a', '1f60b', '1f60c', '1f60d', '1f60e', '1f60f',
    '1f610', '1f611', '1f612', '1f613', '1f614', '1f615', '1f616', '1f617', 
    '1f618', '1f619', '1f61a', '1f61b', '1f61c', '1f61d', '1f61e', '1f61f', 
    '1f620', '1f621', '1f622', '1f623', '1f624', '1f625', '1f626', '1f627', 
    '1f628', '1f629', '1f62a', '1f62b', '1f62c', '1f62d', '1f62e', '1f62f', 
    '1f630', '1f631', '1f632', '1f633', '1f634', '1f635', '1f636', '1f637', 
    '1f638', '1f639', '1f63a', '1f63b', '1f63c', '1f63d', '1f63e', '1f63f', 
    '1f640', '1f641', '1f642', '1f643', '1f644', '1f910', '1f911', '1f912',
    '1f913', '1f914', '1f915', '1f916', '1f917', '1f920', '1f921', '1f922', 
    '1f923', '1f924', '1f925', '1f927', '1f928', '1f929', '1f9d0', '2639'
  ];
  
  list.forEach(function(emoji) {
    addEmojiToContainer(emoji);
  });
   
}

function addEmojiToContainer(emoji) {
  let emojiFont = emojione.convert(emoji);
  let span = $(`<span class="emoji">${emojiFont}</span>`);
  $("#emoji-container").append(span);

}

$("#smiley").on("click", function(e) {
  if(e.target === this) {
    $("#emoji-container").toggle("slow");
  }
});




getPeopleEmoji();

