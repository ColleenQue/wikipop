const userRoutes = require('./users');
const privateRoutes = require('./private');
const groupRoutes=require('./groups');
const path = require('path');
const blogRoutes = require('./blogs')
const idolRoutes=require('./idols');


const constructorMethod = (app) => {
  app.use('/user', userRoutes);
  app.use('/blogs',blogRoutes);
  app.use('/private', privateRoutes);
  app.use('/groups',groupRoutes);
  app.use('/idols',idolRoutes);
  app.get('/',(req,res)=>{
    res.sendFile(path.resolve('static/index.html'));
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });

};

module.exports = constructorMethod;