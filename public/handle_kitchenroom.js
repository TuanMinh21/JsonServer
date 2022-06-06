var socket = io("http://192.168.43.1:8000");

$(document).ready(function() {
    var $door2 = $('#door_2'); // Define
    var $humidity = $('#humi'); // Define
    var $temperature = $('#temp');
    var $gas = $('#gas');
    var $led2 = $('#led_2');
    var $warn2 = $('#warn_2');

    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/kitchensecure',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                $humidity.append(order.humi + "%");
                $temperature.append(order.temp + "°C");
                $gas.append(order.gas + "%");
                if (order.warn2 == 1) $warn2.append("WARNING");
                else $warn2.append("SAFE");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/kitchenled2',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                if (order.led_2 == 1) $led2.append("ON");
                else $led2.append("OFF");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/kitchendoor2',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                if (order.door_2 == 0) $door2.append("OPENED");
                else $door2.append("CLOSED");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
    // button

    $('#LedON').click(function(e) {
        //alert("Handler for LedON");
        socket.emit("Client-led2", '{"led_2": "1"}');
    });

    $('#LedOFF').click(function(e) {
        //alert("Handler for LedOFF");
        socket.emit("Client-led2", '{"led_2": "0"}');
    });
    $('#OpenDoor').click(function(e) {
        socket.emit("Client-door2", '{"door_2": "0"}');
    });
    $('#CloseDoor').click(function(e) {
        socket.emit("Client-door2", '{"door_2": "90"}');
    });
})

socket.on("kitchensecure-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $humi = $('#humi'); // Define
    var $temp = $('#temp');
    var $gas = $('#gas');
    var $warn2 = $('#warn_2');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/addkitchensecure',
        dataType: 'JSON',
        data: {
            humi: dataServer.humi,
            temp: dataServer.temp,
            gas: dataServer.gas,
            warn_2: dataServer.warn_2
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $humi.empty();
    $temp.empty();
    $gas.empty();
    $warn2.empty();
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/kitchensecure',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                $humi.append(order.humi + "%");
                $temp.append(order.temp + "°C");
                $gas.append(order.gas + "%");
                if (order.warn_2 == 1) $warn2.append("WARNING");
                else $warn2.append("SAFE");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});
socket.on("kitchenled2-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $led2 = $('#led_2');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/addled2',
        dataType: 'JSON',
        data: {
            led_2: dataServer.led_2
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $led2.empty();
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/kitchenled2',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                if (order.led_2 == 1) $led2.append("ON");
                else $led2.append("OFF");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});

socket.on("kitchendoor2-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $door2 = $('#door_2');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/adddoor2',
        dataType: 'JSON',
        data: {
            door_2: dataServer.door_2
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $door2.empty();
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/kitchendoor2',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                if (order.door_2 == 0) $door2.append("OPENED");
                else $door2.append("CLOSED");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});