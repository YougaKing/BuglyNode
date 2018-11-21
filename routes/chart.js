const mongodb = require("mongodb");
const express = require('express');
const router = express.Router();

//MongoDB connection URL - mongodb://host:port/dbName
const dbHost = "mongodb://localhost:27017/";

//DB Object
let dbo;

//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
mongodb.MongoClient.connect(dbHost, function (err, db) {
    if (err) {
        console.error(err);
    } else {
        console.log("数据库已创建!");
    }
    dbo = db.db("buglynode");
});

function drawChart(res) {
    //use the find() API and pass an empty query object to retrieve all records
    dbo.collection("crash").find({}).toArray(function (err, docs) {
        if (err) {
            console.error(err);
        }
        const monthArray = [];
        const petrolPrices = [];
        const dieselPrices = [];

        for (index in docs) {
            const doc = docs[index];
            //category array
            const month = doc['month'];
            //series 1 values array
            const petrol = doc['petrol'];
            //series 2 values array
            const diesel = doc['diesel'];
            monthArray.push({"label": month});
            petrolPrices.push({"value": petrol});
            dieselPrices.push({"value": diesel});
        }

        const dataSet = [
            {
                "seriesname": "Petrol Price",
                "data": petrolPrices
            },
            {
                "seriesname": "Diesel Price",
                "data": dieselPrices
            }
        ];

        const response = {
            "dataset": dataSet,
            "categories": monthArray
        };
        res.json(response);
    });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.error('chart()');
    drawChart(res);
});

module.exports = router;