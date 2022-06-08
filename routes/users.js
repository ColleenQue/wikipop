const express = require('express');
const router = express.Router();
const validation = require('../validation');
const user = require('../data/users');
const console = require('../helper');


router.get('/', async (req, res) => {

  if (req.session.user) {
    console.logging(new Date().toUTCString(),req.method,req.originalUrl,true);
    res.redirect('/private')

  }
  else
  {
    console.logging(new Date().toUTCString(),req.method,req.originalUrl,false);
    res.render('posts/login', { title: "Log in" });
  }
   
});

router.get('/signup', async (req, res) => {
  if (req.session.user) {
    console.logging(new Date().toUTCString(),req.method,req.originalUrl,true);
    res.redirect('/private')
  }
  else{
    console.logging(new Date().toUTCString(),req.method,req.originalUrl,false);
    res.render('posts/signup', { title: "Sign Up" });

  }
});

router.post('/signup', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let result;

  try {
    
    password = validation.checkPassWord(req.body.password);
    username = validation.checkUserName(req.body.username);
    result = await user.createUser(username, password);
    console.logging(new Date().toUTCString(),req.method,req.originalUrl,false);
    if (result.userInserted) {
      res.redirect('/');
    }
    else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  catch (e) {
    //render the sign-up screen once again
    //along with an HTTP 400 status code) explaining what they had entered incorrectly.
    res.status(400).render('posts/signup', { err: true, message: e ,title: "Sign up"});
    return;
  }

});


router.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let result;

  try {
    password = validation.checkPassWord(req.body.password);
    username = validation.checkUserName(req.body.username);
    result = await user.checkUser(username, password);
    console.logging(new Date().toUTCString(),req.method,req.originalUrl,false);
  }
  catch (e) {
    res.status(400).render('posts/login', { err: true, message: e ,title:"Log in"});
    return;
  }


  if (result.authenticated === true) {
    req.session.user = username;
    res.redirect('/private');

  }
  else {
    res.status(500).json({ error: "Internal Server Error" });
  }

})

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.render('posts/logout');
  console.logging(new Date().toUTCString(),req.method,req.originalUrl,false);
});

module.exports = router;