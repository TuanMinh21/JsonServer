const route = require('express').Router();
const dbSV = require('../db_api/dbSV');


route.get('/createdb', async(req, res) => {
    let data = await dbSV.createdb();
    res.send(JSON.stringify(data));
});
// Light sensor table
route.get('/createLight', async function(req, res) {
    let data = await dbSV.Light();
    res.send(JSON.stringify(data));
});
// Gas sensor table
route.get('/createGas', async function(req, res) {
    let data = await dbSV.Gas();
    res.send(JSON.stringify(data));
});
// DHT table
route.get('/createDHT', async function(req, res) {
    let data = await dbSV.dht();
    res.send(JSON.stringify(data));
});
// Don't care now
route.get('/info', async function(req, res) {
    let data = await dbSV.getDHT();
    res.send(JSON.stringify(data));
});
// DHT value
route.get('/newDHTvalue', async function(req, res) {
    let data = await dbSV.newDHTvalue();
    res.send(JSON.stringify(data));
});
// Light sensor value
route.get('/newLightvalue', async function(req, res) {
    let data = await dbSV.newLightvalue();
    res.send(JSON.stringify(data));
});
// Light sensor value
route.get('/newGasvalue', async function(req, res) {
    let data = await dbSV.newGasvalue();
    res.send(JSON.stringify(data));
});
// Gas sensor value
route.post('/addtoGas', async function(req, res) {
    res.send({ status: (await dbSV.addtoGas(req.body)) ? 'true' : 'false' });
});
// Insert to Light sensor table
route.post('/addtoLight', async function(req, res) {
    res.send({ status: (await dbSV.addtoLight(req.body)) ? 'true' : 'false' });
})
route.post('/addtoDHT', async function(req, res) {
    res.send({ status: (await dbSV.addtoDHT(req.body)) ? 'true' : 'false' });
})
route.post('/deleteDHT', async function(req, res) {
    res.send({ status: (await dbSV.deleteDHT(req.body)) ? 'true' : 'false' });
})
module.exports = route;