const express = require("express");
const router = express.Router();

const User =  require("../models/users.js")

router.get('/new', (req, res) => {
    res.render('users/new.ejs', {metaTitle: "Register Your Account"});
});

router.post("/", (req, res) => {
    User.create(req.body, (err, createdUser) => {
        console.log(createdUser);
        res.redirect("/");
    });
});





module.exports = router;