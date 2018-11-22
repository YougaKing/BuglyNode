const express = require('express');
const router = express.Router();

const version = '7.4.0';

/* GET users listing. */
router.get('/', function (req, res, next) {

    let query = req.query;

    console.log(query);

    res.render('index', query);
});

module.exports = router;
