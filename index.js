const express = require('express');
const app = express();
const dbSV = require('./db_api/dbSV');
const routes = require('./db_api/routes');
const mqtt = require('mqtt');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use('/', routes);

const IP = '172.17.9.88';


const Topic = 'SensorState'; //subscribe from websocket, ESP32 Publish.
const Topic1 = 'RelayState'; // Server publish, ESP32 Subscribe.
const Broker_URL = 'mqtt://broker.hivemq.com'; // 'mqtt://fdb00560.ap-southeast-1.emqx.cloud'

const options = {
    clientId: 'BrokerHiveMQ',
    username: '',
    password: '',
    port: 1883,
    keepalive: 60
};

const client = mqtt.connect(Broker_URL, options); // Host: mqtt://localhost:1883


const PORT = process.env.PORT || 8000;


const server = app.listen(PORT, function() { // server = app.listen(PORT, IP, function()
    let host = server.address().address;
    let port = server.address().port;
    console.log("App Node.js hoat dong tai dia chi: http://%s:%s", host, port);
    //console.log("App Node.js dang lang nghe tai port: %s", port);
});


// mqtt connect
client.on('connect', function() {
    client.subscribe(Topic, { qos: 1 }); // Doi du lieu ESP32, ESP8266
    console.log("subscribe topic...");
});

client.on("error", function(error) {
    console.log("mqtt can't connect.." + error);
    process.exit(1);
});
// Socket
const io = require("socket.io")(server);

io.on("connection", function(socket) {
    let dataItem = null;
    console.log("Connect ID: " + socket.id); // ID dang ket noi voi websocket
    socket.on("disconnect", function() {
        console.log(socket.id + " has disconnect"); // ID ngat ket noi voi websocket
    });

    socket.on("Client-send-data", function(data) { // Nhan du lieu tu websocket
        io.sockets.emit("Server-send-data", data); // Gui du lieu sang web show data
        client.publish(Topic1, data); // Publish data from websocket
        //console.log(data);
    });
    socket.on("Client-doorstate", function(data) { // Nhan du lieu tu websocket
        //io.sockets.emit("Server-send-data", data); // Gui du lieu sang web show data
        console.log(data);
        client.publish(Topic1, data); // Publish data from websocket
        //console.log(data);
    });
    socket.on("Client-control", function(data) { // Nhan du lieu tu websocket
        //io.sockets.emit("Server-send-data", data); // Gui du lieu sang web show data
        client.publish(Topic1, data); // Publish data from websocket
        //console.log(data);
    });
    socket.on("Client-ledstate", function(data) { // Nhan du lieu den LED tu websocket
        //io.sockets.emit("Server-ledstate", data);
        console.log(data);
        client.publish(Topic1, data); // Publish data with topic "RelayState" from websocket
        //console.log(data);
    });
    socket.on("Client-air-conditioner", function(data) {
        //io.sockets.emit("Server-req-remove-data", data);
        client.publish(Topic1, data); // Publish data from air conditioner controller
        //console.log(data);
    });
});
client.on('message', function(Topic, message) { // Sensor state
    //Nhận dữ liệu và lưu vào biến msg_str
    var msg_str = message.toString();
    var temp = msg_str;
    //In ra console để debug
    console.log("Topic: " + Topic);
    console.log("Message: " + msg_str);
    var data = JSON.parse(temp);
    if (data.humidity && data.temperature) { // Nhận được dữ liệu từ DHT sensor
        console.log("Update new DHT data");
        io.sockets.emit("Server-send-dht-data", msg_str);
    } else if (data.light) {
        console.log("Update new Light State");
        io.sockets.emit("Server-send-light-data", msg_str);
    } else if (data.gas) {
        console.log("Update new Gas Sensor value");
        io.sockets.emit("Server-send-gas-data", msg_str);
    } else {
        console.log("Incorrect data!!!");
    }
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});
app.get('/index', function(req, res) {
    res.render('index.ejs');
});
app.get('/bedroom', function(req, res) {
    res.render('bedroom.ejs');
});
app.get('/livingroom', function(req, res) {
    res.render('livingroom.ejs');
});
app.get('/kitchenroom', function(req, res) {
    res.render('kitchenroom.ejs');
});
app.get('/showdata', function(req, res) {
    res.render('showdata.ejs');
});



// cloud service. pw: Hikaru1600995860@