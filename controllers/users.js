const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User =  require("../models/users.js")

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

router.get("/", (req, res) => {
    if(req.session.currentUser) {
        res.render("../views/users/index.ejs",{ currentUser: req.session.currentUser,metaTitle: "User Tickets Page"});
    } else {
        res.redirect("/sessions/new");
    }
});

//Hash password storage
router.post("/", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.username = req.body.username.toLowerCase();
    User.create(req.body, (err, createdUser) => {
        res.redirect("/");
    });
});





module.exports = router;