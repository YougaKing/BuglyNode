const express = require('express');
const router = express.Router();
const db = require("../db.js");



/* GET users listing. */
router.get('/', function (req, res, next) {
    // db.drawChart(res);
    res.render("chart");
});

module.exports = router;
