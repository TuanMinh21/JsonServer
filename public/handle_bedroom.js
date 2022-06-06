var socket = io("http://192.168.43.1:8000");

$(document).ready(function() {
    var $door3 = $('#door_3'); // Define
    var $led3 = $('#led_3');
    var $led4 = $('#led_4');
    var $led5 = $('#led_5');
    var $led6 = $('#led_6');

    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomled3',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                if (order.led_3 == "1") $led3.append("OFF");
                else $led3.append("ON");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomled4',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                if (order.led_4 == 1) $led4.append("ON");
                else $led4.append("OFF");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomled5',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                if (order.led_5 == 1) $led5.append("ON");
                else $led5.append("OFF");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomled6',
        success: function(data) {
            let dataItems = JSON.parse(data);
            $.each(dataItems, function(i, order) {
                if (order.led_6 == 1) $led6.append("ON");
                else $led6.append("OFF");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomdoor3',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                if (order.door_3 == 90) $door3.append("OPENED");
                else $door3.append("CLOSED");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
    // button
    $('#Led4ON').click(function(e) {
        socket.emit("Client-led4", '{"led_4": "1"}');
    });
    $('#Led4OFF').click(function(e) {
        socket.emit("Client-led4", '{"led_4": "0"}');
    });

    $('#Led5ON').click(function(e) {
        socket.emit("Client-led5", '{"led_5": "1"}');
    });
    $('#Led5OFF').click(function(e) {
        socket.emit("Client-led5", '{"led_5": "0"}');
    });
    $('#Led6ON').click(function(e) {
        socket.emit("Client-led6", '{"led_6": "1"}');
    });
    $('#Led6OFF').click(function(e) {
        socket.emit("Client-led6", '{"led_6": "0"}');
    });

    $('#OpenDoor').click(function(e) {
        socket.emit("Client-door3", '{"door_3": "90"}');
    });
    $('#CloseDoor').click(function(e) {
        socket.emit("Client-door3", '{"door_3": "0"}');
    });
})

socket.on("bedroomled3-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $led3 = $('#led_3');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/addled3',
        dataType: 'JSON',
        data: {
            led_3: dataServer.led_3
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $led3.empty();
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomled3',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                if (order.led_3 == "1") $led3.append("OFF");
                else $led3.append("ON");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});

socket.on("bedroomled4-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $led4 = $('#led_4');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/addled4',
        dataType: 'JSON',
        data: {
            led_4: dataServer.led_4
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $led4.empty();
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomled4',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                if (order.led_4 == 1) $led4.append("ON");
                else $led4.append("OFF");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});

socket.on("bedroomled5-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $led5 = $('#led_5');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/addled5',
        dataType: 'JSON',
        data: {
            led_5: dataServer.led_5
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $led5.empty();
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomled5',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                if (order.led_5 == 1) $led5.append("ON");
                else $led5.append("OFF");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});

socket.on("bedroomled6-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $led6 = $('#led_6');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/addled6',
        dataType: 'JSON',
        data: {
            led_6: dataServer.led_6
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $led6.empty();
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomled6',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                if (order.led_6 == 1) $led6.append("ON");
                else $led6.append("OFF");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});

socket.on("bedroomdoor3-data", function(data) { // Nhan data tu server socketio (addinfo)
    var $door3 = $('#door_3');
    let dataServer = JSON.parse(data);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.43.1:8000/adddoor3',
        dataType: 'JSON',
        data: {
            door_3: dataServer.door_3
        },
        success: function(newdata) {
            // Thanh cong
        },
        error: function() {
            alert('error saving data');
        }
    });
    // reload data
    $door3.empty();
    $.ajax({
        type: 'GET',
        url: 'http://192.168.43.1:8000/bedroomdoor3',
        success: function(data) {
            let dataItems1 = JSON.parse(data);
            $.each(dataItems1, function(i, order) {
                if (order.door_3 == 90) $door3.append("OPENED");
                else $door3.append("CLOSED");
            });
        },
        error: function() {
            alert('error loading data');
        }
    });
});