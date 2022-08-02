const express = require('express');
const router = express.Router();
const validation = require('../validation');
const blogs = require('../data/blogs');
const con = require('../helper');
const { checkBlogContent } = require('../validation');
const comments = require('../data/comments');
const users= require("../data/users");
const { findBlog } = require('../data/blogs');
const { data } = require('jquery');

// router.use("/", (req, res, next) => {
//   //if session not logged in
//   if (!req.session.user) {
//     return res.redirect("/user/login");
//   }
//   next();
// });


router.get("/:page", async (req, res, next) => {

  let not_logged = false;

  if (!req.session.user) {
    not_logged = true;
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
router.post("/:page", async (req, res) => {
  //error check
  //add blog

  let not_logged = false;

  let page = req.params.page;

  let last, temp;
  let next, prev = null;

  
  if (!req.session.user) {
    not_logged = true;
  }


  //for all: get page
  try {
    temp = await blogs.getBlogsPerPage(page);
  }
  catch (e) {
    return res.render("posts/blogs/blog", {
      blogs: "sorry no blogs were found",
      title: "Blogs",
      stylesheet: "/public/styles/main.css", not_logged_in: not_logged
    });
  }

  try {
    last = await blogs.LastPage();
    temp = await blogs.getBlogsPerPage(page);

    //not first page
    if (page > 1) {
      prev = parseInt(page) - 1;
    }

    //not last page
    if (page < last) {
      next = parseInt(page) + 1;
    }
  } 
  catch (e) {
    return res.sendStatus(500);
  }



  if (not_logged) {
    try {
      return res.render("posts/blogs/blog", {
        blogs: temp,
        page: page,
        prev: prev,
        next: next,
        error3:"please log in",
        title: "Blogs",
        stylesheet: "/public/styles/main.css", not_logged_in: not_logged
      });
    }
    catch (e) {
      return res.sendStatus(500);
    }
  }


  //log in check success
  let newBlog;


  //check inputs
  try {
    validation.checkBlogTitle(req.body.title);
    content = validation.checkBlogContent(req.body.content)
  }
  catch (e) {
    return res.render("posts/blogs/blog", {
      blogs: temp,
      title: "Blogs",
      error2: true,
      page: page,
      prev: prev,
      next: next,
      stylesheet: "/public/styles/main.css", not_logged_in: not_logged
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
      page: page,
      prev: prev,
      next: next,
      stylesheet: "/public/styles/main.css", not_logged_in: not_logged
    });
  }


  //everything has changed
  page = await blogs.LastPage();
  page = Math.ceil(page);

  //console.log(req.session.user); gives username
  try {
    last = await blogs.LastPage();
    temp = await blogs.getBlogsPerPage(page);

    next, prev = null;

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
      stylesheet: "/public/styles/main.css", not_logged_in: not_logged
    });
  } catch (e) {
    return res.sendStatus(500);
  }

})



router.get("/details/:id", async (req, res, next) => {

  /*
  let not_logged = false;

  if (!req.session.user) {
    not_logged = true;
  }
  */

  try {
    let temp = await blogs.findBlog(req.params.id);
    const allComments=await blogs.getAllComments(req.params.id);
    if(req.session.user)
    {
      const theUser=await users.findUser(req.session.user);
      const blogsLiked=theUser[0].blogsLiked;
      const blogId=req.params.id;
      const getBlog=await blogs.findBlog(blogId);
      const blogTitle=getBlog.title;
      const blogLiked=false;
      for(let i=0;i<blogsLiked.length;i++)
      {
        if(blogsLiked[i].blogID===blogId && blogsLiked[i].blogTitle===blogTitle)
        {
          blogLiked=true;
          break;
        }
      }
      //console.log(blogLiked);
      return res.render("posts/blogs/blog2", {
        blog: temp,
        title: "Blogs",
        script: "/public/scripts/blogs.js",
        not_logged_in: false,
        like: blogLiked,
        comments: allComments,
      });
    }
    else
    {
      return res.render("posts/blogs/blog2", {
        blog: temp,
        title: "Blogs",
        script: "/public/scripts/blogs.js",
        not_logged_in: true,
        like: false,
        comments: allComments,
      });
    }
  }
  catch (e) {
    return res.sendStatus(500);
  }

})


router.post("/details/:id", async (req, res) => {
  let not_logged = false;

  if (!req.session.user) {
    not_logged = true;
  }
  try {
    //add comment
    //let commenter = req.session.user;
    //let content = req.body.content;

    //await blogs.addComment(req.params.id,commenter,content)

    //TODO switch to ajax request
      return res.render("posts/blogs/blog2", {
        blog: temp,
        title: "Blogs",
        script: "/public/scripts/blogs.js", 
        not_logged_in: not_logged,
      })

  }
  catch (e) {
    return res.sendStatus(500);
  }

})

router.get("/details/:id/like", async(req,res) =>
{
  if(req.session.user)
  {
    const findBlog=await blogs.findBlog(req.params.id);
    const blogTitle=findBlog.title;
    const addNewBlog=await users.addNewBlog(req.session.user,blogTitle,req.params.id);
    const likeBlog=await blogs.likeBlog(req.params.id);
    res.redirect('/details/'+req.params.id);
  }
  else
  {
    res.sendStatus(400);
  }
})

router.get("/details/:id/unlike", async(req,res) =>
{
  if(req.session.user)
  {
    const findBlog=await blogs.findBlog(req.params.id);
    const blogTitle=findBlog.title;
    const removeBlog=await users.removeBlog(req.session.user,blogTitle,req.params.id);
    const unlikeBlog=await blogs.unlikeBlog(req.params.id);
    res.redirect('/details/'+req.params.id);
  }
  else
  {
    res.sendStatus(400);
  }
})


router.get("/details/:id/comments", async (req, res, next) => {

  let not_logged = false;

  if (!req.session.user) {
    not_logged = true;
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
});

router.delete("/details/:id/deleteComment", async(req, res) =>
{
  //res.sendStatus(400);
  let blogID=validation.checkBlogID(req.params.id);
  let commentID=validation.checkCommentID(req.body.commentId);
  let deleteComment=await blogs.deleteComment(blogID,commentID);
  //return res.redirect('/details/'+blogID);
});



router.post("/details/:id/comments", async (req, res, next) => {

  let not_logged = false;

  if (!req.session.user) {
    not_logged = true;
  }

  try {
    //add comment

    //TODO switch to ajax request
    let user = req.session.user;
    let comment = await blogs.addComment(req.params.id, user, req.body.comment);

    return res.json({ success: true, comment: comment, user: user });
    //return res.redirect('/details/'+req.params.id);

  }
  catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }

})

router.get("details/:id/comment/:commentId", async (req, res) => {

  //get all first layer comments id's 

  try{
    let commentId = req.params.commentId;
    let user = req.session.user;

    let comment = await blogs.findComment(commentId);

    console.log(comment);
    let subComments = comment.comments;
    return res.json({success:true,subComments:subComments});
  }
  catch(e){
    console.log(e);
    return res.sendStatus(500);
  }


  //get all commenter and content




});

/*
router.delete("details/:id/comment", async (req, res) => {
  //check parameters
  res.sendStatus(400);
  //let blogID=validation.checkBlogID(req.params.id);
  //let commentID=validation.checkCommentID(req.body.commentId);
  //console.log("working now?");
  //let deleteComment=await users.removeComment(blogID,commentID);
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
*/

router.post("/:page/search", async (req, res) => {
  //get 
  let searchTerm, resultList, temp, last;
  let next, prev = null;
  let page = req.params.page;


  //for user login and signout 
  let not_logged = false;

  if (!req.session.user) {
    not_logged = true;
  }

  //code for search
  try {
    temp = await blogs.getBlogsPerPage(page);
    last = await blogs.LastPage();

    if (!req.body.tag) {
      throw "Please enter search Term";
    }
    searchTerm = req.body.tag;

    if (typeof searchTerm !== 'string') throw "search term must be a string";
    //find array 
    if (searchTerm.trim().length === 0) throw "Error: search term must not be all empty spaces"


  }

  catch (e) {
    //not first page
    if (page > 1) {
      prev = parseInt(page) - 1;
    }

    //not last page
    if (page < last) {
      next = parseInt(page) + 1;
    }


    //user input issue 
    return res.render("posts/blogs/blog", {
      blogs: temp,
      page: page,
      prev: prev,
      next: next,
      error0: e,
      title: "Blogs",
      stylesheet: "/public/styles/main.css", not_logged_in: not_logged
    });
  }

  //done with error checking
  try {
    resultList = await blogs.searchBlogs(searchTerm);
  }
  catch (e) {
    //internal server issue
    return res.render("posts/blogs/blog", {
      blogs: temp,
      page: page,
      prev: prev,
      next: next,
      error0: e,
      title: "Blogs",
      stylesheet: "/public/styles/main.css", not_logged_in: not_logged
    });
  }

  //display results instead of all blogs


  try {
    //redo the pages 
    //show only search results 
    console.log("here");


    return res.render("posts/blogs/blog", {
      //changed blog to search results only
      blogs: resultList,
      search: true,
      title: "Blogs",
      stylesheet: "/public/styles/main.css", not_logged_in: not_logged
    });
  }
  catch (e) {
    //internal server issue
    return res.sendStatus(500);
  }



});


module.exports = router;
