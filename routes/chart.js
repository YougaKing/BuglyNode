const db = require('../db.js');
const express = require('express');
const router = express.Router();
const version = '7.4.0';

function topChart(res) {
    let where = {"productVersion": version};
    db.queryCrashMap(where, function (result) {
        result.version = version;

        const categories = [];
        const backstage = [];
        const reception = [];
        const dataSet = [
            {
                "seriesname": "后台",
                "data": backstage
            },
            {
                "seriesname": "前台",
                "data": reception
            }
        ];

        result.forEach(function (item) {
            let backstageCount = 0;
            let receptionCount = 0;
            let expName = '';
            item['list'].forEach(function (crash) {
                expName = crash['expName'];
                if (crash['appInBack'].toUpperCase() === 'TRUE') {
                    backstageCount++;
                } else {
                    receptionCount++;
                }
            });
            categories.push({'label': expName.slice(expName.lastIndexOf('.') + 1)});
            backstage.push({'value': backstageCount});
            reception.push({'value': receptionCount});
        });
        const response = {
            'dataSet': dataSet,
            'categories': categories,
            'version': version,
        };
        res.json(response);
    });
}

function allChart(res) {

}

/* GET users listing. */
router.get('/', function (req, res, next) {
    let query = req.query;

    console.log(query);

    let type = query['type'];

    try {
        if (type === 'top') {
            topChart(res);
        } else if (type === 'all') {
            allChart(res);
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;