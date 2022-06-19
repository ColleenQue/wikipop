const express = require('express');
const router = express.Router();
const validation = require('../validation');
const blogs = require('../data/blogs');
const con = require('../helper');
const { checkBlogContent } = require('../validation');

//get itself/main page
router.use("/", (req, res, next) => {
  //if session not logged in
  if (!req.session.user) {
    return res.redirect("/user/login");
  }
  next();
});

router.get("/", async (req, res, next) => {
  try {

    let temp = await blogs.getAllBlogs();
    return res.render("blogs/blog", {
      blogs: temp,
      title: "Blogs",
      stylesheet:"/public/styles/main.css"
    });
  } catch (e) {
    return res.sendStatus(500);
  }

})


router.post("/", async (req, res, next) => {
  //error check

  let title,content,temp;

  try{
    temp = await blogs.getAllBlogs();
  }
  catch(e){
    return res.render("blogs/blog", {
      blogs: "sorry no blogs were found",
      title: "Blogs",
      stylesheet:"/public/styles/main.css"
    });
  }
  

  try {
     title = validation.checkBlogTitle(req.body.title)
  }
  catch (e) {
    return res.render("blogs/blog", {
      blogs: temp,
      title: "Blogs",
      stylesheet:"/public/styles/main.css",
      error1: true
    });
  }

  
  try {
     content = validation.checkBlogContent(req.body.content)
  }
  catch (e) {
    return res.render("blogs/blog", {
      blogs: temp,
      title: "Blogs",
      error2: true,
      stylesheet:"/public/styles/main.css"
    });
  }

  try {
    //purpose is to add new blog
    await blogs.createBlog(req.session.user, req.body.title, req.body.content)
    let temp = await blogs.getAllBlogs();
    return res.render("blogs/blog", {
      blogs: temp,
      title: "Blogs",
      stylesheet:"/public/styles/main.css"
    });
  } catch (e) {
    return res.sendStatus(500);
  }

  //console.log(req.session.user); gives username


})

module.exports = router;