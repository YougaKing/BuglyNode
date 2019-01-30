const express = require('express');
const router = express.Router();
const bugly = require('../bugly.js');
const db = require('../db.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let query = req.query;
    let type = query['type'];
    let version = query['version'];

    try {
        if (type === 'issueList') {
            issueList(res, version);
        } else {
            res.render('crash', query);
        }
    } catch (err) {
        console.log(err)
    }
});


function issueList(res, version) {
    let where = {"version": version};
    let sort = {"index": -1};
    db.queryIssueList(where, sort, function (result) {
        res.json(result);
        if (result.length > 0) {
            let issue = result[0];
            bugly.getIssueListForUploadTime(issue.index, version);
        } else {
            bugly.getIssueListForUploadTime(0, version);
        }
    });
}

module.exports = router;
