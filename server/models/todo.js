var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', new mongoose.Schema({
  text: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
  }, 
  completed: {
      default: false,
      type: Boolean
  }, 
  completedAt: {
      type: Number,
      default: null
  }
}));

module.exports = {
  Todo
};
