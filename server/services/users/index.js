const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { User } = require('../../models/user');

module.exports = (app) => {
  app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.talk();
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((err) => {
      res.status(400).send(err);
    });
  });

  app.get('/users', (req, res) => {
    res.send('ok');
  });

  app.get('/users/:id', (req, res) => {
    res.send('ok');

  });

  app.patch('/users/:id', (req, res) => {
    res.send('ok');

  });
};
