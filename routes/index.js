const express = require('express');
const router = express.Router();
const db = require('../db.js');
const bugly = require('../bugly.js');


function versionList(res) {
    db.queryVersionList(function (result) {
        res.json(result);
    });
    bugly.getVersionList();
}

/* GET users listing. */
router.get('/', function (req, res, next) {

    let query = req.query;
    let type = query['type'];

    try {
        if (type === 'versionList') {
            versionList(res);
        } else {
            res.render('index', query);
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;
