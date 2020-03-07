const express = require("express");
const router = express.Router();
const Ticket = require("../models/tickets");

router.get("/", (req, res) => {
    res.send("tickets index page");
})











module.exports = router;