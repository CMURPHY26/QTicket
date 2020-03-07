const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");


router.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {metaTitle: "QTicket Login Page"});
})


router.delete("/", (req, res) => {
    req.session.destroy( () => {
        res.redirect("/");
    });
});

//OLD basic login verification
// router.post("/", (req, res) => {
//     User.findOne({ username: req.body.username }, (err, foundUser) => {
//         if(req.body.password === foundUser.password) {
//             req.session.currentUser = foundUser;
//             res.redirect("/");
//         } else {
//             res.send("wrong password");
//         }
//     })
// });

router.post("/", (req, res) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, foundUser) => {
        if(!foundUser) {
            // console.log(err);
            res.redirect("/");
        } else {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect("/");
            } else {
                res.send("wrong password");
            }
        }
    });
});






module.exports = router;