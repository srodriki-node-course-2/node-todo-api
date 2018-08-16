var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .catch((err) => {
    console.log('Error connecting to the db', err);
  });

module.exports = {
  mongoose
};
