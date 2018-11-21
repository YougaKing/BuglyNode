const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // db.drawChart(res);
    res.render('index');
});

module.exports = router;
