const express = require('express');
const router = express.Router();
const bugly = require('../bugly.js');
const db = require('../db.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let where = {"version": '7.4.0'};
    let sort = {"index": -1};
    db.queryIssueList(where, sort, function (result) {
        if (result.length > 0) {
            let issue = result[0];
            bugly.getIssueListForUploadTime(issue.index, '7.4.0');
            res.json(result);
        } else {
            bugly.getIssueListForUploadTime(0, '7.4.0');
            res.send('加载中...');
        }
    });
});

module.exports = router;
