(function() {

  (function getRooms() { //IIFE
    
    $.get("/rooms", function(roomList) {
      let roomsDiv = $("#rooms");

      if (Object.keys(roomList).length > 0) {
        let label = $("<label for='roomToJoin'>Join a room</label>");
        let selectField = $("<select name='roomToJoin' form='join-chat'><option value=''></option></select>");
        
        for (var roomName in roomList) {
          let option = $(`<option value="${roomName}">${roomName}</option>`);
          selectField.append(option);
        };

        roomsDiv.append(label, selectField);
      } else {
        roomsDiv.append("<p>There are no rooms currently in use...</p>");
      }
    });
  }());

  $("#rooms").on("change", "select", function() {
    let val = $(this).val();
    let createRoom = $("#create-room");

    if (val === "") {
      createRoom.show(400);
      $("input[name='room']").prop( "disabled", false );
    } else {
      createRoom.hide(400);
      $("input[name='room']").prop( "disabled", true );
    }
  });

  $("#join-room").on("click", function() {
    let select = $("#rooms select");
    if ( select.val() === "") {
      select.prop("disabled", true);
    }
  });
}());