const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    issue: String,
    request: String,
    resolved: Boolean
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;