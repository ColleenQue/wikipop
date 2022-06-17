const userRoutes = require('./users');
const privateRoutes = require('./private');
const path = require('path');
const blogRoutes = require('./blogs')

const constructorMethod = (app) => {
  app.use('/user', userRoutes);
  app.use('/blogs',blogRoutes);
  app.use('/private', privateRoutes);
  app.get('/',(req,res)=>{
    res.sendFile(path.resolve('static/index.html'));
  });
  

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });

};

module.exports = constructorMethod;