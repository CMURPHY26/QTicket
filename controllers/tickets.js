const express = require("express");
const router = express.Router();
const Ticket = require("../models/tickets");


//NEW Tickets
router.get("/new", (req, res) => {
    if(req.session.currentUser){
        res.render('new.ejs', {metaTitle: "QTicket Add a ticket", currentUser: req.session.currentUser});
    } else {
        res.redirect("/sessions/new");
    }
})

//CREATE Tickets
router.post("/", (req, res) => {
    console.log(req.body);
    req.body.username = req.session.currentUser.username;
    Ticket.create(req.body, (err, createdTicket) => {
        console.log(createdTicket);
        res.redirect("/users");
    })
})


//Tickets Index
router.get("/", (req, res) => {
    if(req.session.currentUser) {
        res.redirect("/users");
    } else {
        res.redirect("/sessions/new");
    }
});
















module.exports = router;