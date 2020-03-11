const express = require("express");
const router = express.Router();
const Ticket = require("../models/tickets");
const User =  require("../models/users.js");



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
    Ticket.findById(req.params.id, (err, foundTicket) => {
        if(req.session.currentUser){
            res.render("edit.ejs", {
                id: req.params.id, 
                metaTitle: "Ticket Edit Page", 
                currentUser: req.session.currentUser,
                ticket: foundTicket
            });
        } else {
            res.redirect("/sessions/new");
        };
    });
});

//SHOW Ticket
router.get("/:id", (req, res) => {
    if(req.session.currentUser){
        Ticket.findById(req.params.id, (err, foundTicket) => {
            User.findOne({username:foundTicket.username}, (err, foundUser) => {
                // console.log(foundUser)
                res.render("show.ejs", {ticket: foundTicket, metaTitle: "Ticket Page", currentUser: req.session.currentUser, id: req.params.id, userid: foundUser.id});
            })
        });
    }else {
        res.redirect("/sessions/new");
    };
});


//UPDATE Ticket
router.put("/:id", (req, res) => {
    if(req.session.currentUser) {
        // req.body.username = req.session.currentUser.username;
        Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, foundTicket) => {
            res.redirect(`/tickets/${req.params.id}`);
        })
    }
});

//CREATE Tickets
router.post("/", (req, res) => {
    console.log(req.body);
    req.body.username = req.session.currentUser.username;
    Ticket.create(req.body, (err, createdTicket) => {
        console.log(createdTicket);
        res.redirect("/tickets");
    })
})

//DELETE Ticket
router.delete("/:id", (req, res) => {
    if(req.session.currentUser) {
        Ticket.findByIdAndRemove(req.params.id, (err, deletedTicket) => {
            User.findOne({username:deletedTicket.username}, (err, foundUser) => {
                if(!req.session.currentUser.isAdmin) {
                    res.redirect("/tickets");
                } else {
                    res.redirect(`/users/${foundUser.id}`);
                }
            })
        })
    } else {
        res.redirect("/sessions/new");
    }
})


//INDEX Tickets
router.get("/", (req, res) => {
    if(req.session.currentUser) {
        Ticket.find({username: req.session.currentUser.username}, (err, foundTickets) => {
            res.render("index.ejs",{ currentUser: req.session.currentUser, metaTitle: "User Tickets Page", tickets: foundTickets});
        });
    } else {
        res.redirect("/sessions/new");
    }
});
















module.exports = router;