const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {

    let query = req.query;

    console.log(query);

    res.render('index', query);
});

module.exports = router;
