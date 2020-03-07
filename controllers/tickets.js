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


//EDIT Ticket
router.get("/:id/edit", (req, res) => {
    if(req.session.currentUser){

        res.render("edit.ejs", {id: req.params.id, metaTitle: "Ticket Edit Page", currentUser: req.session.currentUser})
    } else {
        res.redirect("/sessions/new");
    };
});

//SHOW Ticket
router.get("/:id", (req, res) => {
    if(req.session.currentUser){
        Ticket.findById(req.params.id, (err, foundTicket) => {
            res.render("show.ejs", {ticket: foundTicket, metaTitle: "Ticket Page", currentUser: req.session.currentUser, id: req.params.id});
        });
    }else {
        res.redirect("/sessions/new");
    };
});


//UPDATE Ticket
router.put("/:id", (req, res) => {
    if(req.session.currentUser) {
        req.body.username = req.session.currentUser.username;
        Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, foundTicket) => {
            res.redirect(`/tickets/${req.params.id}`);
        })
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

//DELETE Ticket
router.delete("/:id", (req, res) => {
    if(req.session.currentUser) {
        Ticket.findByIdAndRemove(req.params.id, (err, deletedTicket) => {
            res.redirect("/users");
        })
    } else {
        res.redirect("/sessions/new");
    }
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