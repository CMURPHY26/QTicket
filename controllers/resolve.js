const express = require("express");
const router = express.Router();
const Ticket = require("../models/tickets");

router.put("/:id", (req, res) => {
    Ticket.findById(req.params.id, (err, foundTicket) =>{
        foundTicket.resolved = true;
        Ticket.findByIdAndUpdate(req.params.id, foundTicket, {new: true}, (err, updatedTicket) => {
            console.log(updatedTicket);
            res.redirect(`/tickets/`);
        });
    });
});


module.exports = router;


