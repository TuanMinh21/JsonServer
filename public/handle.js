var socket = io("https://twillight.herokuapp.com");

$(document).ready(function() {
    var $orders = $('#orders');
    var $id = $('#id');
    var $humidity = $('#humidity');
    var $temperature = $('#temperature');

    $('#add').click(function(e) {
        var humidity = $humidity.val();
        var temperature = $temperature.val();
        socket.emit("Client-send-data", '{"humidity":"' + humidity + '" ,"temperature":"' + temperature + '"}');
    });
    $('#LedON').click(function(e) {
        socket.emit("Client-ledstate", '{"ledstate":"1"}');
    });
    $('#LedOFF').click(function(e) {
        socket.emit("Client-ledstate", '{"ledstate":"0"}');
    });
    $('#del').click(function(e) {
        var id = $id.val();
        socket.emit("Client-req-remove-data", '{"id":"' + id + '"}');
    });
    $('#refresh').on('click', function() {
        $orders.load(" ");
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/info',
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
})