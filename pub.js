const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.1.5');
const topic = 'Topic1';
const message = 'Alo 1 2 3 4'

client.on('connect', () => {
    client.publish(topic, message);
    console.log('message: ', message);

}, 5000);