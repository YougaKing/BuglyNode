const express = require('express');
const router = express.Router();
const bugly = require('../bugly.js');
const db = require('../db.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let query = req.query;
    console.log(query);
    try {
        res.render('crash', query);
    } catch (err) {
        console.log(err)
    }
});


function getIssueListForUploadTime() {
    let where = {"version": '7.4.0'};
    let sort = {"index": -1};
    db.queryIssueList(where, sort, function (result) {
        if (result.length > 0) {
            let issue = result[0];
            bugly.getIssueListForUploadTime(issue.index, '7.4.0');
        } else {
            bugly.getIssueListForUploadTime(0, '7.4.0');
        }
    });
}

module.exports = router;
