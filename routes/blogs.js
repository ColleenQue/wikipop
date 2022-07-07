const express = require('express');
const router = express.Router();
const validation = require('../validation');
const blogs = require('../data/blogs');
const con = require('../helper');
const { checkBlogContent } = require('../validation');
const comments = require('../data/comments')

// router.use("/", (req, res, next) => {
//   //if session not logged in
//   if (!req.session.user) {
//     return res.redirect("/user/login");
//   }
//   next();
// });

router.get("/:page", async (req, res, next) => {

  let not_logged= false;

  if (!req.session.user) {
    not_logged=true;
  }

  try {
    let page = req.params.page;
    let last = await blogs.LastPage();
    let temp = await blogs.getBlogsPerPage(page);
    let next, prev = null;

    //not first page
    if (page > 1) {
      prev = parseInt(page) - 1;
    }

    //not last page
    if (page < last) {
      next = parseInt(page) + 1;
    }

    return res.render("posts/blogs/blog", {
      blogs: temp,
      page: page,
      prev: prev,
      next: next,
      title: "Blogs",
      stylesheet: "/public/styles/main.css", not_logged_in: not_logged
    });



  } catch (e) {
    return res.sendStatus(500);
  }

})

//post blog
router.post("/", async (req, res, next) => {
  //error check
  //add blog
  let not_logged= false;

  if (!req.session.user) {
    not_logged=true;
  }

  let newBlog, temp;

  try {
    temp = await blogs.getAllBlogs();
  }
  catch (e) {
    return res.render("posts/blogs/blog", {
      blogs: "sorry no blogs were found",
      title: "Blogs",
      stylesheet: "/public/styles/main.css", not_logged_in: not_logged
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
      error1: true, not_logged_in: true
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
      stylesheet: "/public/styles/main.css",  not_logged_in: not_logged
    });
  }

  try {
    //purpose is to add new blog
    newBlog = await blogs.createBlog(req.session.user, req.body.title, req.body.content);
  } catch (e) {
    return res.render("posts/blogs/blog", {
      blogs: temp,
      title: "Blogs",
      error2: true,
      stylesheet: "/public/styles/main.css",  not_logged_in: not_logged
    });
  }

  let page = await blogs.LastPage();
  page = Math.ceil(page);
  console.log(page);


  //console.log(req.session.user); gives username
  try {
    let last = await blogs.LastPage();
    let temp = await blogs.getBlogsPerPage(page);

    let next, prev = null;

    //not first page
    if (page > 1) {
      prev = parseInt(page) - 1;
    }

    //not last page
    if (page < last) {
      next = parseInt(page) + 1;
    }


    return res.render("posts/blogs/blog", {
      newBlog: newBlog,
      blogs: temp,
      page: page,
      prev: prev,
      next: next,
      title: "Blogs",
      stylesheet: "/public/styles/main.css",not_logged_in: not_logged
    });
  } catch (e) {
    return res.sendStatus(500);
  }

})



router.get("/details/:id", async (req, res, next) => {

  let not_logged= false;

  if (!req.session.user) {
    not_logged=true;
  }

  try {

    let temp = await blogs.findBlog(req.params.id);
    return res.render("posts/blogs/blog2", {
      blog: temp,
      title: "Blogs",
      script: "/public/scripts/blogs.js", not_logged_in: not_logged
    });


  }
  catch (e) {

    return res.sendStatus(500);
  }

})


router.post("/details/:id", async (req, res, next) => {

  let not_logged= false;

  if (!req.session.user) {
    not_logged=true;
  }

  try {
    //add comment
    let commenter = req.session.user;
    let content = req.body.content;

    //await blogs.addComment(req.params.id,commenter,content)

    //TODO switch to ajax request
    let temp = await blogs.findBlog(req.params.id);

    return res.render("posts/blogs/blog2", {
      blog: temp,
      title: "Blogs",
      script: "/public/scripts/blogs.js", not_logged_in: not_logged
    });

  }
  catch (e) {

    return res.sendStatus(500);
  }

})


router.get("/details/:id/comments", async (req, res, next) => {

  let not_logged= false;

  if (!req.session.user) {
    not_logged=true;
  }

  //gets all comments for current blog id
  let blog, comments, user;
  try {
    //returns blog on success
    blog = await blogs.findBlog(req.params.id);
  }
  catch (e) {
    return res.status(404).json({ error: e });
  }

  try {
    //gives data from blog object
    comments = blog.comments;
    user = req.session.user;
    console.log(comments);

    //note that this user is not the commenter
    console.log(user);
    return res.json({ success: true, comments: comments, user: user });
  }
  catch (e) {
    //returns a json 

    console.log("here1");
    return res.status(500).json({ error: e });
  }
})



router.post("/details/:id/comments", async (req, res, next) => {

  let not_logged= false;

  if (!req.session.user) {
    not_logged=true;
  }
  
  try {
    //add comment

    //TODO switch to ajax request

    console.log(req.params.id);
    let user = req.session.user;
    console.log(req.body.comment)
    let comment = await blogs.addComment(req.params.id, user, req.body.comment);

    return res.json({ success: true, comment: comment, user: user });

  }
  catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }

})


router.delete("details/:id/comment", async (req, res) => {
  //check parameters
  let outfitId, commentId;
  // try {
  //   outfitId = validation2.checkId(req.params.id);
  //   commentId = validation2.checkId(req.body.commentId);
  // } catch (e) {
  //   return res.status(400).render("pages/error/error", {
  //     title: "Error",
  //     stylesheet: "/public/styles/outfit_card_styles.css",
  //     error: e,
  //   });
  // }
  // if (!req.session.admin) {
  //   return res.status(403).render("pages/error/error", {
  //     title: "Error",
  //     stylesheet: "/public/styles/outfit_card_styles.css",
  //     error: "403: Forbidden",
  //   });
  // }
  try {
    let deletionInfo = await data.deleteComment(xss(outfitId), xss(commentId));
    if (!deletionInfo.deleted) throw "Error: could not delete comment";
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});




module.exports = router;