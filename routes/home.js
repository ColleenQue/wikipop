const express = require("express");
const router = express.Router();
const { ObjectId } = require('mongodb');


router.route('/').get( async (req, res) => {
    try {
    //check if user is logged in
      if (!req.session.user) throw 'Error: No user is logged in';

      res.status(200).render("posts/home", {
        title: "Wiki Pop",
        stylesheet: '/public/css/home.css',
      });
    } catch (e) {
      res.status(200).render("posts/home", {
        title: "Wiki Pop",
        stylesheet: '/public/css/home.css',
        not_logged_in: true,
      });
    }
  });

  module.exports = router;