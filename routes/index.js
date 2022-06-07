const userRoutes = require('./users');
const privateRoutes = require('./private');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/private', privateRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });

};

module.exports = constructorMethod;