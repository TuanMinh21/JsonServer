const aedes = require('aedes')({ id: "My_Broker" });
const server = require('net').createServer(aedes.handle);
const port = 1883;
const ip = "172.17.9.88";

server.listen(port, ip, function() {
    console.log('server started and listening on port', port);
})

aedes.on('client', function(client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
})

aedes.on('clientDisconnect', function(client) {
    console.log('Client Disconnected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
})

aedes.on('publish', async function(packet, client) {
    console.log('Client \x1b[33m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)
})