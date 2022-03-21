var socket = io("https://twilightdb.herokuapp.com");

$(document).ready(function() {
    var $humidity = $('#humi'); // Define
    var $temperature = $('#temp');
    var $gas = $('#gas');
    $.ajax({
        type: 'GET',
        url: 'https://twilightdb.herokuapp.com/newDHTvalue',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                $humidity.append(order.humidity + "%");
                $temperature.append(order.temperature + "°C");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'https://twilightdb.herokuapp.com/newGasvalue',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                $gas.append(order.gas);
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    $('#LedON').click(function(e) {
        //alert("Handler for LedON");
        socket.emit("Client-ledstate", '{"led3":"1"}');
    });
    $('#LedOFF').click(function(e) {
        //alert("Handler for LedOFF");
        socket.emit("Client-ledstate", '{"led3":"0"}');
    });
})

socket.on("Server-send-dht-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $humidity = $('#humi'); // Define
    var $temperature = $('#temp');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'https://twilightdb.herokuapp.com/addtoDHT',
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
        url: 'https://twilightdb.herokuapp.com/newDHTvalue',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                $temperature.append(order.temperature + "°C");
                $humidity.append(order.humidity + "%");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});
socket.on("Server-send-gas-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $gas = $('#gas');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'https://twilightdb.herokuapp.com/addtoGas',
        dataType: 'JSON',
        data: {
            gas: dataServer.gas
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $gas.empty();
    $.ajax({
        type: 'GET',
        url: 'https://twilightdb.herokuapp.com/newGasvalue',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                $gas.append(order.gas);
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});