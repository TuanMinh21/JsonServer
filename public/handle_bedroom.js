var socket = io("https://twilightdb.herokuapp.com");

$(document).ready(function() {

    $('#LedON').click(function(e) {
        //alert("Handler for LedON");
        socket.emit("Client-ledstate", '{"led2":"1"}');
    });
    $('#LedOFF').click(function(e) {
        //alert("Handler for LedOFF");
        socket.emit("Client-ledstate", '{"led2":"0"}');
    });
    $('#MachineON').click(function(e) {
        socket.emit("Client-air-conditioner", '{"relay":"1"}');
    });
    $('#MachineOFF').click(function(e) {
        socket.emit("Client-air-conditioner", '{"relay":"0"}');
    });
})