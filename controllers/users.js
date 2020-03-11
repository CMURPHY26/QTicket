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

//SHOW USER Tickets
router.get("/:id", (req, res) => {
    if(req.session.currentUser) {
        User.findById(req.params.id, (err, foundUser) => {
            Ticket.find({username: foundUser.username}, (err, foundTickets) => {
                res.render("users/show.ejs", {metaTitle: "Admin View for User Tickets", currentUser: req.session.currentUser, user:foundUser, tickets: foundTickets});
            });
        });
    } else {
        res.redirect("/");
    }
});


//INDEX Users
router.get("/", (req, res) => {
    if(req.session.currentUser) {
        User.find({}, (err, foundUsers) => {
            res.render("users/index.ejs", {metaTitle: "Admin Homepage", currentUser: req.session.currentUser, users:foundUsers});
        })
    } else {
        res.redirect("/");
    }
})

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