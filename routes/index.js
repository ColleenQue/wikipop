const userRoutes = require('./users');
const privateRoutes = require('./private');
const groupRoutes=require('./groups');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/private', privateRoutes);
  app.use('/groups',groupRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });

};

module.exports = constructorMethod;