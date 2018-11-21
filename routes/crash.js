const express = require('express');
const router = express.Router();
const bugly = require('../bugly.js');
const db = require('../db.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    db.queryIssueList(null, function (result) {
        if (result.length > 0) {
            res.json(result);
        } else {
            bugly.getIssueListForUploadTime('7.4.0');
            res.send('加载中...');
        }
    });
});

module.exports = router;
