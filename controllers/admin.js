const express = require("express");
const router = express.Router();
const Ticket = require("../models/tickets");
const User =  require("../models/users.js");


//SHOW
router.get("/:id", (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        Ticket.find({username: foundUser.username}, (err, foundTickets) => {
            res.render("admin/show.ejs", {metaTitle: "Admin View for User Tickets", currentUser: req.session.currentUser, user:foundUser, tickets: foundTickets});
        });
    });
});

//INDEX Admin
router.get("/", (req, res) => {
    if(req.session.currentUser) {
        User.find({}, (err, foundUsers) => {
            res.render("admin/index.ejs", {metaTitle: "Admin Homepage", currentUser: req.session.currentUser, users:foundUsers});
        })
    } else {
        res.redirect("/");
    }
})


module.exports = router;