const express = require('express');
const router = express.Router();
const bugly = require('bugly.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    bugly.getIssueListForUploadTime('7.4.0', res, next);
    res.render('users');
});

module.exports = router;
