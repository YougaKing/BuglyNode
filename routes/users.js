const express = require('express');
const router = express.Router();
const file = require("../file.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
    file.readFile(0);
    res.send('respond with a resource');
});

module.exports = router;
