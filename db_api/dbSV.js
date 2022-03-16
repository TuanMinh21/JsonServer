const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iotsystem'
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
exports.dht = function() {
    return new Promise(function(resolve, reject) {
        let sql = "CREATE TABLE dht(id MEDIUMINT NOT NULL AUTO_INCREMENT, humidity VARCHAR(7), temperature VARCHAR(7), PRIMARY KEY(id))";
        let query = mysql.format(sql);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Create table DHT
exports.Gas = function() {
    return new Promise(function(resolve, reject) {
        let sql = "CREATE TABLE GasSensor(id MEDIUMINT NOT NULL AUTO_INCREMENT, gas VARCHAR(7), PRIMARY KEY(id))";
        let query = mysql.format(sql);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Create table Light Sensor
exports.Light = function() {
    return new Promise(function(resolve, reject) {
        let sql = "CREATE TABLE LightSensor(id MEDIUMINT NOT NULL AUTO_INCREMENT, light VARCHAR(7), PRIMARY KEY(id))";
        let query = mysql.format(sql);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Create  db 
exports.createdb = function() {
    return new Promise(function(resolve, reject) {
        let sql = "CREATE DATABASE iotsystem";
        let query = mysql.format(sql);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Show Info
exports.getDHT = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM dht";
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert Light Sensor 
exports.addtoLight = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO LightSensor (light) VALUE (?);";
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
// Insert Gas Sensor 
exports.addtoGas = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO GasSensor (gas) VALUE (?);";
        let query = mysql.format(queryItem, [data.gas]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};
// Get new Temperature and Humidity 
exports.newDHTvalue = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM dht WHERE id = (SELECT max(id) FROM dht);"
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Get new Light sensor value
exports.newLightvalue = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM LightSensor WHERE id = (SELECT max(id) FROM LightSensor);"
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Get new Gas sensor value
exports.newGasvalue = function() {
    return new Promise(function(resolve, reject) {
        let queryItem = "SELECT * FROM GasSensor WHERE id = (SELECT max(id) FROM GasSensor);"
        let query = mysql.format(queryItem);
        db.query(query, function(err, rows, field) {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
// Insert DHT by api
exports.addtoDHT = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "INSERT INTO dht (humidity, temperature) VALUE (?,?);";
        let query = mysql.format(queryItem, [data.humidity, data.temperature]);
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
exports.deleteDHT = function(data) {
    return new Promise(function(resolve, reject) {
        let queryItem = "DELETE FROM dht WHERE id = ?;";
        let query = mysql.format(queryItem, [data.id]);
        db.query(query, function(err, rows, field) {
            if (err) {
                console.log(err);
                resolve(false);
            };
            resolve(true);
        });
    });
};