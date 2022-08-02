const userRoutes = require('./users');
const privateRoutes = require('./private');
const groupRoutes=require('./groups');
const blogRoutes = require('./blogs')
const idolRoutes=require('./idols');
const homeRoutes = require("./home");


const constructorMethod = (app) => {
  app.use('/user', userRoutes);
  app.use('/blogs',blogRoutes);
  app.use('/private', privateRoutes);
  app.use('/groups',groupRoutes);
  app.use('/idols',idolRoutes);
  app.use("/home", homeRoutes);

  app.use("", (req, res) => {
    res.redirect("/home");
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });

};

module.exports = constructorMethod;