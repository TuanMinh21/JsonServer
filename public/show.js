var socket = io("https://twilightdb.herokuapp.com");
//var $orders = $('#orders');
socket.on("Server-send-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $orders = $('#orders');
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
    //$orders.load(" #orders");
    $orders.load(" ");
    $.ajax({
        type: 'GET',
        url: 'https://twilightdb.herokuapp.com/info',
        success: function(data) {
            let dataItems = JSON.parse(data)
            $.each(dataItems, function(i, order) {
                $orders.append('<li> Humidity: ' + order.humidity + ', Temperature: ' + order.temperature + '</li>');
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});
socket.on("Server-req-remove-data", function(data) { // Nhan data tu server socketio (deleteinfo)
    var $orders = $('#orders');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'https://twilightdb.herokuapp.com/deleteDHT',
        dataType: 'JSON',
        data: {
            diachid: dataServer.id
        },
        success: function(newdata) {
            // Xoa thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    //$orders.load(" #orders");
    $orders.load(" ");
    $.ajax({
        type: 'GET',
        url: 'https://twilightdb.herokuapp.com/info',
        success: function(data) {
            let dataItems = JSON.parse(data)
            $.each(dataItems, function(i, order) {
                $orders.append('<li> Humidity: ' + order.humidity + ', Temperature: ' + order.temperature + '</li>');
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});
//showdata

$(document).ready(function() {
    var $orders = $('#orders');
    $.ajax({
        type: 'GET',
        url: 'https://twilightdb.herokuapp.com/info',
        success: function(data) {
            let dataItems = JSON.parse(data)
            $.each(dataItems, function(i, order) {
                $orders.append('<li> Humidity: ' + order.humidity + ', Temperature: ' + order.temperature + '</li>');
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
})
socket.on("Server-ledstate", function(data) { // Nhan data tu server socketio (addinfo)
    // reload data
    $orders.load(" ");
    $.ajax({
        type: 'GET',
        url: 'https://twilightdb.herokuapp.com/info',
        success: function(data) {
            let dataItems = JSON.parse(data)
            $.each(dataItems, function(i, order) {
                $orders.append('<li> Humidity: ' + order.humidity + ', Temperature: ' + order.temperature + '</li>');
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});