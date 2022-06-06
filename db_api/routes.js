const route = require('express').Router();
const dbSV = require('../db_api/dbSV');


// route.get('/createdb', async(req, res) => {
//     let data = await dbSV.createdb();
//     res.send(JSON.stringify(data));
// });

// Gas sensor table
// route.get('/createGas', async function(req, res) {
//     let data = await dbSV.Gas();
//     res.send(JSON.stringify(data));
// });

// Get latest data from maindoorsure
route.get('/maindoorsecure', async function(req, res) {
    let data = await dbSV.maindoorsecure();
    res.send(JSON.stringify(data));
});
// Insert warn 1, door 1 to maindoorsecure
route.post('/addmaindoorsecure', async function(req, res) {
    res.send({ status: (await dbSV.addmaindoorsecure(req.body)) ? 'true' : 'false' });
})

// Get latest data from maindoorlight
route.get('/maindoorlight', async function(req, res) {
    let data = await dbSV.maindoorlight();
    res.send(JSON.stringify(data));
});

// Insert light sensor to maindoor
route.post('/addlight', async function(req, res) {
    res.send({ status: (await dbSV.addlight(req.body)) ? 'true' : 'false' });
})

// Get latest data from bedroomled3
route.get('/bedroomled3', async function(req, res) {
    let data = await dbSV.bedroomled3();
    res.send(JSON.stringify(data));
});

// Insert led3 sensor to bedroomled3
route.post('/addled3', async function(req, res) {
    res.send({ status: (await dbSV.addled3(req.body)) ? 'true' : 'false' });
})

// Get latest data from bedroomled4
route.get('/bedroomled4', async function(req, res) {
    let data = await dbSV.bedroomled4();
    res.send(JSON.stringify(data));
});

// Insert led4 sensor to maindoorled4
route.post('/addled4', async function(req, res) {
    res.send({ status: (await dbSV.addled4(req.body)) ? 'true' : 'false' });
})

// Get latest data from bedroomled5
route.get('/bedroomled5', async function(req, res) {
    let data = await dbSV.bedroomled5();
    res.send(JSON.stringify(data));
});

// Insert led5 sensor to bedroomled5
route.post('/addled5', async function(req, res) {
    res.send({ status: (await dbSV.addled5(req.body)) ? 'true' : 'false' });
})

// Get latest data from bedroomled6
route.get('/bedroomled6', async function(req, res) {
    let data = await dbSV.bedroomled6();
    res.send(JSON.stringify(data));
});

// Insert led6 sensor to maindoorled6
route.post('/addled6', async function(req, res) {
    res.send({ status: (await dbSV.addled6(req.body)) ? 'true' : 'false' });
})

// Get latest data from bedroomdoor3
route.get('/bedroomdoor3', async function(req, res) {
    let data = await dbSV.bedroomdoor3();
    res.send(JSON.stringify(data));
});

// Insert door3 to bedroomdoor3
route.post('/adddoor3', async function(req, res) {
    res.send({ status: (await dbSV.adddoor3(req.body)) ? 'true' : 'false' });
})

// Get latest data from kitchensecure
route.get('/kitchensecure', async function(req, res) {
    let data = await dbSV.kitchensecure();
    res.send(JSON.stringify(data));
});

// Insert warn_1, gas, humi, temp to kitchensecure
route.post('/addkitchensecure', async function(req, res) {
    res.send({ status: (await dbSV.addkitchensecure(req.body)) ? 'true' : 'false' });
})

// Get latest data from kitchenled2
route.get('/kitchenled2', async function(req, res) {
    let data = await dbSV.kitchenled2();
    res.send(JSON.stringify(data));
});

// Insert led2 sensor to kitchenled2
route.post('/addled2', async function(req, res) {
    res.send({ status: (await dbSV.addled2(req.body)) ? 'true' : 'false' });
})

// Get latest data from kitchendoor2
route.get('/kitchendoor2', async function(req, res) {
    let data = await dbSV.kitchendoor2();
    res.send(JSON.stringify(data));
});

// Insert door2 to kitchendoor2
route.post('/adddoor2', async function(req, res) {
    res.send({ status: (await dbSV.adddoor2(req.body)) ? 'true' : 'false' });
})

// Don't care now
// route.get('/info', async function(req, res) {
//     let data = await dbSV.getDHT();
//     res.send(JSON.stringify(data));
// });
// DHT value
// route.get('/newDHTvalue', async function(req, res) {
//     let data = await dbSV.newDHTvalue();
//     res.send(JSON.stringify(data));
// });
// // Light sensor value
// route.get('/newLightvalue', async function(req, res) {
//     let data = await dbSV.newLightvalue();
//     res.send(JSON.stringify(data));
// });
// // Light sensor value
// route.get('/newGasvalue', async function(req, res) {
//     let data = await dbSV.newGasvalue();
//     res.send(JSON.stringify(data));
// });
// // Insert warn 1, door 1 to maindoor
// route.post('/addtoGas', async function(req, res) {
//     res.send({ status: (await dbSV.security(req.body)) ? 'true' : 'false' });
// });

// route.post('/addtoDHT', async function(req, res) {
//     res.send({ status: (await dbSV.addtoDHT(req.body)) ? 'true' : 'false' });
// })
// route.post('/deleteDHT', async function(req, res) {
//     res.send({ status: (await dbSV.deleteDHT(req.body)) ? 'true' : 'false' });
// })
module.exports = route;