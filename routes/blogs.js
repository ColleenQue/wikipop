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

router.get("/:page", async (req, res, next) => {
  try {
    let page = req.params.page;
    let last = await blogs.LastPage();
    let temp = await blogs.getBlogsPerPage(page);

    if (page == 1) {
      return res.render("posts/blogs/blog", {
        blogs: temp,
        page: page,
        next: parseInt(page) + 1,
        title: "Blogs",
        stylesheet: "/public/styles/main.css"
      });
    }

    if(page >= last){
      return res.render("posts/blogs/blog", {
        blogs: temp,
        page: page,
        prev: page - 1,
        title: "Blogs",
        stylesheet: "/public/styles/main.css"
      });

    }

    return res.render("posts/blogs/blog", {
      blogs: temp,
      page: page,
      prev: page - 1,
      next: page + 1,
      title: "Blogs",
      stylesheet: "/public/styles/main.css"
    });
  } catch (e) {
    return res.sendStatus(500);
  }

})


router.post("/", async (req, res, next) => {
  //error check

  let title, content, temp;

  try {
    temp = await blogs.getAllBlogs();
  }
  catch (e) {
    return res.render("posts/blogs/blog", {
      blogs: "sorry no blogs were found",
      title: "Blogs",
      stylesheet: "/public/styles/main.css"
    });
  }


  try {
    title = validation.checkBlogTitle(req.body.title)
  }
  catch (e) {
    return res.render("posts/blogs/blog", {
      blogs: temp,
      title: "Blogs",
      stylesheet: "/public/styles/main.css",
      error1: true
    });
  }


  try {
    content = validation.checkBlogContent(req.body.content)
  }
  catch (e) {
    return res.render("posts/blogs/blog", {
      blogs: temp,
      title: "Blogs",
      error2: true,
      stylesheet: "/public/styles/main.css"
    });
  }

  try {
    //purpose is to add new blog
    await blogs.createBlog(req.session.user, req.body.title, req.body.content)
    let temp = await blogs.getAllBlogs();
    return res.render("posts/blogs/blog", {
      blogs: temp,
      title: "Blogs",
      stylesheet: "/public/styles/main.css"
    });
  } catch (e) {
    return res.sendStatus(500);
  }

  //console.log(req.session.user); gives username


})



router.get("/details/:id", async (req, res, next) => {

  let temp = await blogs.findBlog(req.params.id);
  return res.render("posts/blogs/blog2", {
    blog: temp,
    title: "Blogs",
    stylesheet: "/public/styles/main.css"
  });

})

module.exports = router;