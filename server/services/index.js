var todos = require('./todos');
var users = require('./users');

const services = [
  todos,
  users
];

var install = (app) => {
  services.forEach((service) => {
    service(app);
  });
}

module.exports = {
  install
}