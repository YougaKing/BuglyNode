const express = require('express');
const router = express.Router();
const bugly = require("../bugly.js");

/* GET home page. */
router.get('/', function (req, res, next) {
    // bugly.getIssueList(0, '7.4.0', res, next);
    res.render('index', { title: 'Express' });
});


module.exports = router;
