const db = require('../db.js');
const express = require('express');
const router = express.Router();

function topChart(res, version) {
    let where = {"productVersion": version};
    db.queryCrashMapTop(where, function (result) {
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

function allChart(res, version) {
    let where = {"productVersion": version};
    db.queryCrashMapAll(where, function (result) {
        result.version = version;

        let backstageCount = 0;
        let receptionCount = 0;
        result.forEach(function (crash) {
            if (crash['appInBack'].toUpperCase() === 'TRUE') {
                backstageCount++;
            } else {
                receptionCount++;
            }
        });
        console.log(backstageCount + "--" + receptionCount);
        const data = [
            {
                "label": "后台",
                "value": backstageCount
            },
            {
                "label": "前台",
                "value": receptionCount
            }
        ];
        const response = {
            'data': data,
            'version': version,
        };
        res.json(response);
    });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    let query = req.query;

    console.log(query);

    let type = query['type'];
    let version = query['version'];

    try {
        if (type === 'top') {
            topChart(res, version);
        } else if (type === 'all') {
            allChart(res, version);
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;