const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'bqynrymxebl1rc9xp3dm-mysql.services.clever-cloud.com',
    user: 'ugw90nd4vqkvhqjs',
    password: 'KwiLoMBc1eVmpLAdVBCR',
    database: 'bqynrymxebl1rc9xp3dm'
});

//Connect
db.connect((err) => {
    if (err) {
        //throw err;
        return console.error('error: ' + err.message);
    }
    console.log('MySql Connected...');
});

const app = express();

// Create table DHT
// exports.dht = function() {
//     return new Promise(function(resolve, reject) {
//         let sql = "CREATE TABLE dht(id MEDIUMINT NOT NULL AUTO_INCREMENT, humidity VARCHAR(7), temperature VARCHAR(7), PRIMARY KEY(id));";
//         let query = mysql.format(sql);
//         db.query(query, function(err, rows, field) {
//             if (err) reject(err);
//             resolve(rows);
//         });
//     });
// };

// exports.Gas = function() {
//     return new Promise(function(resolve, reject) {
//         let sql = "CREATE TABLE GasSensor(id MEDIUMINT NOT NULL AUTO_INCREMENT, gas VARCHAR(7), PRIMARY KEY(id));";
//         let query = mysql.format(sql);
//         db.query(query, function(err, rows, field) {
//             if (err) reject(err);
//             resolve(rows);
//         });
//     });
// };
// Create table Light Sensor
// exports.Light = function() {
//     return new Promise(function(resolve, reject) {
//         let sql = "CREATE TABLE LightSensor(id MEDIUMINT NOT NULL AUTO_INCREMENT, light VARCHAR(7), PRIMARY KEY(id));";
//         let query = mysql.format(sql);
//         db.query(query, function(err, rows, field) {
//             if (err) reject(err);
//             resolve(rows);
//         });
//     });
// };
// Create  db 
// exports.createdb = function() {
//     return new Promise(function(resolve, reject) {
//         let sql = "CREATE DATABASE iotsystem";
//         let query = mysql.format(sql);
//         db.query(query, function(err, rows, field) {
//             if (err) reject(err);
//             resolve(rows);
//         });
//     });
// };

/*  This is maindoor section */

// Select security data from maindoorsecure
exports.maindoorsecure = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM maindoorsecure WHERE id = (SELECT max(id) FROM maindoorsecure);";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

// Insert warn 1, door 1 to maindoorsecure
exports.addmaindoorsecure = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO maindoorsecure (warn_1, door_1) VALUE (?, ?);";
        let query = mysql.format(queryItem, [data.warn_1, data.door_1]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};
// Select light data from maindoorlight
exports.maindoorlight = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM maindoorlight WHERE id = (SELECT max(id) FROM maindoorlight);";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert light to maindoor 
exports.addlight = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO maindoorlight (light) VALUE (?);";
        let query = mysql.format(queryItem, [data.light]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};


/*  This is bedroom section */

// Select led3 data from bedroomled3
exports.bedroomled3 = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM bedroomled3 WHERE id = (SELECT max(id) FROM bedroomled3);";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert led3 to bedroomled3 
exports.addled3 = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO bedroomled3 (led_3) VALUE (?);";
        let query = mysql.format(queryItem, [data.led_3]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};

// Select led4 data from bedroomled4
exports.bedroomled4 = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM bedroomled4 WHERE id = (SELECT max(id) FROM bedroomled4);";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert led4 to bedroomled4 
exports.addled4 = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO bedroomled4 (led_4) VALUE (?);";
        let query = mysql.format(queryItem, [data.led_4]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};

// Select led5 data from bedroomled5
exports.bedroomled5 = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM bedroomled5 WHERE id = (SELECT max(id) FROM bedroomled5);";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert led5 to bedroomled5 
exports.addled5 = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO bedroomled5 (led_5) VALUE (?);";
        let query = mysql.format(queryItem, [data.led_5]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};

// Select led6 data from bedroomled6
exports.bedroomled6 = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM bedroomled6 WHERE id = (SELECT max(id) FROM bedroomled6);";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert led6 to bedroomled6 
exports.addled6 = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO bedroomled6 (led_6) VALUE (?);";
        let query = mysql.format(queryItem, [data.led_6]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};

// Select door3 data from bedroomdoor3
exports.bedroomdoor3 = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM bedroomdoor3 WHERE id = (SELECT max(id) FROM bedroomdoor3);";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert door3 to bedroomdoor3
exports.adddoor3 = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO bedroomdoor3 (door_3) VALUE (?);";
        let query = mysql.format(queryItem, [data.door_3]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};

/*  This is kitchenroom section */

// Get latest warn 2, Gas, Temperature and Humidity from kitchensecure
exports.kitchensecure = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM kitchensecure WHERE id = (SELECT max(id) FROM kitchensecure);"
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

// Insert DHT, gas, warn 1 by sensor
exports.addkitchensecure = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO kitchensecure (warn_2, gas, humi, temp) VALUE (?,?,?,?);";
        let query = mysql.format(queryItem, [data.warn_2, data.gas, data.humi, data.temp]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};

// Select led2 data from kitchenled2
exports.kitchenled2 = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM kitchenled2 WHERE id = (SELECT max(id) FROM kitchenled2);";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert led2 to kitchenled2 
exports.addled2 = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO kitchenled2 (led_2) VALUE (?);";
        let query = mysql.format(queryItem, [data.led_2]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};

// Select door2 data from kitchendoor2
exports.kitchendoor2 = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM kitchendoor2 WHERE id = (SELECT max(id) FROM kitchendoor2);";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert door2 to kitchendoor2
exports.adddoor2 = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO kitchendoor2 (door_2) VALUE (?);";
        let query = mysql.format(queryItem, [data.door_2]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};

// delete table from info
// exports.deleteDHT = function(data) {
//     return new Promise(function(resolve, reject) {
//         let queryItem = "DELETE FROM dht WHERE id = ?;";
//         let query = mysql.format(queryItem, [data.id]);
//         db.query(query, function(err, rows, field) {
//             if (err) {
//                 console.log(err);
//                 resolve(false);
//             };
//             resolve(true);
//         });
//     });
// };