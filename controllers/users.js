const express = require("express");
const router = express.Router();


router.get('/new', (req, res) => {
    res.render('users/new.ejs', {metaTitle: "Register Your Account"});
});




module.exports = router;