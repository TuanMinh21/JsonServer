// examples data
// {"warn_1": "1", "door_1": "60"}
// {"humi": "70", "temp": "32", "gas": "55", "warn_2": "1"}

const express = require('express');
const app = express();
const dbSV = require('./db_api/dbSV');
const routes = require('./db_api/routes');
const mqtt = require('mqtt');
//const { NULL } = require('mysql/lib/protocol/constants/types');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use('/', routes);

//const IP = '172.17.9.88';


// const Topic = 'maindoorstate'; //subscribe from websocket, ESP32 Publish.
// const Topic1 = 'kitchenstate'; // Server publish, ESP32 Subscribe.
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
    console.log("App Node.js hoat dong tai port: http://%s:%s", host, port);
    //console.log("App Node.js dang lang nghe tai port: %s", port);
});


// mqtt connect
client.on('connect', function() {
    client.subscribe("gateway-state", { qos: 1 }); // Doi du lieu ESP32, ESP8266
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
        console.log(socket.id + " has disconnected"); // ID ngat ket noi voi websocket
    });

    socket.on("Client-led4", function(data) { // Nhan du lieu tu websocket
        io.sockets.emit("bedroomled4-data", data); // Gui du lieu sang web show data
        console.log(data);
        client.publish("server-state", data); // Publish data from websocket
    });

    socket.on("Client-led5", function(data) { // Nhan du lieu tu websocket
        io.sockets.emit("bedroomled5-data", data); // Gui du lieu sang web show data
        console.log(data);
        client.publish("server-state", data); // Publish data from websocket
    });
    socket.on("Client-led6", function(data) { // Nhan du lieu tu websocket
        io.sockets.emit("bedroomled6-data", data); // Gui du lieu sang web show data
        console.log(data);
        client.publish("server-state", data); // Publish data from websocket
        //console.log(data);
    });
    socket.on("Client-door3", function(data) { // Nhan du lieu tu websocket
        io.sockets.emit("bedroomdoor3-data", data); // Gui du lieu sang web show data
        console.log(data);
        client.publish("server-state", data); // Publish data from websocket
    });

    socket.on("Client-door2", function(data) { // Nhan du lieu door tu websocket
        io.sockets.emit("kitchendoor2-data", data);
        console.log(data);
        client.publish("server-state", data); // Publish data with topic from websocket
    });

    socket.on("Client-led2", function(data) { // Nhan du lieu den LED tu websocket
        io.sockets.emit("kitchenled2-data", data);
        console.log(data);
        client.publish("server-state", data); // Publish data with topic from websocket
    });

    socket.on("Client-door1", function(data) { // maindoor
        io.sockets.emit("maindoorsecure-data", data);
        console.log(data);
        client.publish("server-state", data); // Publish data from air conditioner controller
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
    //console.log(data.humi);
    if (data.humi && data.temp && data.gas && data.warn_2) { // Nhận được dữ liệu từ ESP32
        console.log("Update kitchensecure-data");
        io.sockets.emit("kitchensecure-data", msg_str);
    } else if (data.led_2) {
        console.log("Update kitchenled2-data");
        io.sockets.emit("kitchenled2-data", msg_str);
    } else if (data.door_2) {
        console.log("Update kitchendoor2-data");
        io.sockets.emit("kitchendoor2-data", msg_str);
    } else if (data.led_3) {
        console.log("Update bedroomled3-data");
        io.sockets.emit("bedroomled3-data", msg_str);
    } else if (data.led_4) {
        console.log("Update bedroomled4-data");
        io.sockets.emit("bedroomled4-data", msg_str);
    } else if (data.led_5) {
        console.log("Update bedroomled5-data");
        io.sockets.emit("bedroomled5-data", msg_str);
    } else if (data.led_6) {
        console.log("Update bedroomled6-data");
        io.sockets.emit("bedroomled6-data", msg_str);
    } else if (data.door_3) {
        console.log("Update bedroomdoor3-data");
        io.sockets.emit("bedroomdoor3-data", msg_str);
    } else if (data.light) {
        console.log("Update maindoorlight-data");
        io.sockets.emit("maindoorlight-data", msg_str);
    } else if (data.warn_1 && data.door_1) {
        console.log("Update maindoorsecure-data");
        io.sockets.emit("maindoorsecure-data", msg_str);
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
// app.get('/livingroom', function(req, res) {
//     res.render('livingroom.ejs');
// });
app.get('/maindoor', function(req, res) {
    res.render('maindoor.ejs');
});
app.get('/kitchenroom', function(req, res) {
    res.render('kitchenroom.ejs');
});
// app.get('/showdata', function(req, res) {
//     res.render('showdata.ejs');
// });

// cloud service for server Heroku. pw: Hikaru1600995860@
// cloud service for database (clever cloud). pw: Hikaru1600995860@