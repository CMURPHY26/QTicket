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

//SHOW Ticket
router.get("/:id", (req, res) => {
    Ticket.findById(req.params.id, (err, foundTicket) => {
        res.render("show.ejs", {ticket: foundTicket, metaTitle: "Ticket Page", currentUser: req.session.currentUser});
    })
});

//CREATE Tickets
router.post("/", (req, res) => {
    console.log(req.body);
    req.body.username = req.session.currentUser.username;
    Ticket.create(req.body, (err, createdTicket) => {
        console.log(createdTicket);
        res.redirect("/users");
    })
})


//INDEX Tickets
router.get("/", (req, res) => {
    if(req.session.currentUser) {
        res.redirect("/users");
    } else {
        res.redirect("/sessions/new");
    }
});
















module.exports = router;