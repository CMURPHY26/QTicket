const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    name: {type:String, required: true },
    request: {type:String, required: true },
    resolved: {type:Boolean, default: false },
    username: {type: String}
},{timestamps: true});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;