const express = require('express');
const router = express.Router();
const validation = require('../validation');
const blogs = require('../data/blogs');
const console = require('../helper');

//get itself/main page
router.use("/", (req, res, next) => {
    //if session not logged in
    if (!req.session.user) {
        return res.redirect("/users/login");
    }
    next();
});

router.get("/",async (req,res,next)=>{
    try {

        let temp = await blogs.getAllBlogs();
        return res.render("blogs/blog", {
          blogs:temp,
          title: "Blogs",
        });
      } catch (e) {
        return res.sendStatus(500);
      }

})

module.exports = router;