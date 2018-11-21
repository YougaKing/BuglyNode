const db = require('../db.js');
const express = require('express');
const router = express.Router();


function drawChart(res) {

    const monthArray = [];
    const petrolPrices = [];
    const dieselPrices = [];

    let docs = [
        {
            'month': 1,
            'petrol': 2345,
            'diesel': 1232,
        },
        {
            'month': 2,
            'petrol': 223,
            'diesel': 432,
        },
        {
            'month': 3,
            'petrol': 1231,
            'diesel': 3423,
        }
    ];

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

    // let where = {"version": '7.4.0'};
    // db.queryCrashMap(where, function (result) {
    //     res.json(result);
    // });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.error('chart()');
    drawChart(res);
});

module.exports = router;