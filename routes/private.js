//private
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.render('posts/private',{username:req.session.user});
})


module.exports = router;