const userRoutes = require('./users');
const privateRoutes = require('./private');
const blogRoutes = require('./blogs')

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/blogs',blogRoutes);
  app.use('/private', privateRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });

};

module.exports = constructorMethod;