const express = require("express");
const router = express.Router();
const Ticket = require("../models/tickets");

router.get("/", (req, res) => {
    if(req.session.currentUser) {
        res.send("tickets index page");
    } else {
        res.redirect("/sessions/new");
    }
})











module.exports = router;