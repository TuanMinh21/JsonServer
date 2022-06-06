var socket = io("http://192.168.43.1:8000");

$(document).ready(function() {
    var $door1 = $('#door_1'); // Define
    var $light = $('#light');
    var $warn1 = $('#warn_1');
    // Show maindoorsecure
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/maindoorsecure',
        success: function(data) {
            let dataItems0 = JSON.parse(data);
            $.each(dataItems0, function(i, order) {
                if (order.door_1 == 0) $door1.append("OPENED");
                else $door1.append("CLOSED");

                $light.append(order.light);

                if (order.warn_1 == 1) $warn1.append("WARNING");
                else $warn1.append("SAFE");
                // $humidity.append(order.humidity + "%");
                // $temperature.append(order.temperature + "°C");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    // Show maindoorlight
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/maindoorlight',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                $light.append(order.light + "%");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    // $('#Control').click(function(e) {
    //     socket.emit("Client-control", '{"auto_control":"1"}'); // Tu dong
    // });
    // $('#Freedom').click(function(e) {
    //     socket.emit("Client-control", '{"auto_control":"0"}'); // Dieu khien 
    // });
    // $('#LedON').click(function(e) {
    //     socket.emit("Client-ledstate", '{"led1":"1"}');
    // });
    // $('#LedOFF').click(function(e) {
    //     socket.emit("Client-ledstate", '{"led1":"0"}');
    // });

    $('#OpenDoor').click(function(e) {
        socket.emit("Client-door1", '{"door_1": "0", "warn_1": "0"}');
    });
    $('#CloseDoor').click(function(e) {
        socket.emit("Client-door1", '{"door_1": "60", "warn_1": "0"}');
    });
});

// maindoorsecure update
socket.on("maindoorsecure-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $door1 = $('#door_1'); // Define
    var $warn1 = $('#warn_1');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/addmaindoorsecure',
        dataType: 'JSON',
        data: {
            warn_1: dataServer.warn_1,
            door_1: dataServer.door_1
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $door1.empty();
    $warn1.empty();
    // Show maindoorsecure
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/maindoorsecure',
        success: function(data) {
            let dataItems0 = JSON.parse(data);
            $.each(dataItems0, function(i, order) {
                if (order.door_1 == 0) $door1.append("OPENED");
                else $door1.append("CLOSED");

                if (order.warn_1 == 1) $warn1.append("WARNING");
                else $warn1.append("SAFE");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});
// maindoorlight update
socket.on("maindoorlight-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $light = $('#light');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/addlight',
        dataType: 'JSON',
        data: {
            light: dataServer.light
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $light.empty();
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/maindoorlight',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                $light.append(order.light + "%");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});