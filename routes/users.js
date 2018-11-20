const express = require('express');
const router = express.Router();
const file = require("../file.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('users');
});

module.exports = router;
