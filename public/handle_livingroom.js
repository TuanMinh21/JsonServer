var socket = io("http://172.17.9.88:8080");

$(document).ready(function() {
    var $humidity = $('#humi'); // Define
    var $temperature = $('#temp');
    var $light = $('#light');
    // Show DHT value
    $.ajax({
        type: 'GET',
        url: 'http://172.17.9.88:8080/newDHTvalue',
        success: function(data) {
            let dataItems0 = JSON.parse(data);
            $.each(dataItems0, function(i, order) {
                $humidity.append(order.humidity + "%");
                $temperature.append(order.temperature + "°C");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
    // Show Light sensor value
    $.ajax({
        type: 'GET',
        url: 'http://172.17.9.88:8080/newLightvalue',
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
    $('#Control').click(function(e) {
        socket.emit("Client-control", '{"auto_control":"1"}'); // Tu dong
    });
    $('#Freedom').click(function(e) {
        socket.emit("Client-control", '{"auto_control":"0"}'); // Dieu khien 
    });
    $('#LedON').click(function(e) {
        socket.emit("Client-ledstate", '{"led1":"1"}');
    });
    $('#LedOFF').click(function(e) {
        socket.emit("Client-ledstate", '{"led1":"0"}');
    });
    $('#OpenDoor').click(function(e) {
        socket.emit("Client-doorstate", '{"doorstate":"1"}');
    });
    $('#CloseDoor').click(function(e) {
        socket.emit("Client-doorstate", '{"doorstate":"0"}');
    });
});
// DHT sensor update
socket.on("Server-send-dht-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $humidity = $('#humi'); // Define
    var $temperature = $('#temp');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://172.17.9.88:8080/addtoDHT',
        dataType: 'JSON',
        data: {
            humidity: dataServer.humidity,
            temperature: dataServer.temperature
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $humidity.empty();
    $temperature.empty();
    $.ajax({
        type: 'GET',
        url: 'http://172.17.9.88:8080/newDHTvalue',
        success: function(data) {
            let dataItems0 = JSON.parse(data);
            $.each(dataItems0, function(i, order) {
                $temperature.append(order.temperature + "°C");
                $humidity.append(order.humidity + "%");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});
// Light sensor update
socket.on("Server-send-light-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $light = $('#light');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://172.17.9.88:8080/addtoLight',
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
        url: 'http://172.17.9.88:8080/newLightvalue',
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