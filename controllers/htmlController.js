const express = require("express"); // npm install express
const router = express.Router();
const db = require("../models");

router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;