const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User =  require("../models/users.js");
const Ticket = require("../models/tickets");


//NEW User
router.get('/new', (req, res) => {
    res.render('users/new.ejs', {metaTitle: "Register Your Account", currentUser: req.session.currentUser});
});

//Original login procedure
// router.post("/", (req, res) => {
//     User.create(req.body, (err, createdUser) => {
//         console.log(createdUser);
//         res.redirect("/");
//     });
// });

//INDEX Users
router.get("/", (req, res) => {
    if(req.session.currentUser) {
            Ticket.find({username: req.session.currentUser.username}, (err, foundTickets) => {
                res.render("users/index.ejs",{ currentUser: req.session.currentUser, metaTitle: "User Tickets Page", tickets: foundTickets});
            });
    } else {
        res.redirect("/sessions/new");
    }
});

//CREATE User
router.post("/", (req, res) => {
    //Hash password storage
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.username = req.body.username.toLowerCase();
    User.create(req.body, (err, createdUser) => {
        res.redirect("/");
    });
});





module.exports = router;