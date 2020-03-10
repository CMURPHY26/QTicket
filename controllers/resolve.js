const express = require("express");
const router = express.Router();
const Ticket = require("../models/tickets");
const User =  require("../models/users.js");

router.put("/:id", (req, res) => {
    Ticket.findById(req.params.id, (err, foundTicket) =>{
        foundTicket.resolved = true;
        Ticket.findByIdAndUpdate(req.params.id, foundTicket, {new: true}, (err, updatedTicket) => {
            console.log(updatedTicket);
            User.findOne({username:foundTicket.username}, (err, foundUser) => {
                if(!req.session.currentUser.isAdmin) {
                res.redirect(`/tickets/`)
                } else {
                res.redirect(`/admin/${foundUser.id}`);
                };
            })
        });
    });
});


module.exports = router;


