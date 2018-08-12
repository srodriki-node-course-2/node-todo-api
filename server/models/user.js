const mongoose = require('mongoose');
const validator = require('validator');

/* {
  email: 'rodrigo@test.omc',
  password: 'q2143243243254kjfrnfjndds',
  tokens: [
    {
      access: 'auth'
      token: '2132131233131'
    }
  ]
} */

var User = mongoose.model('User', new mongoose.Schema({
  email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail(value),
        message: '{VALUE} is not a valid email'
      }
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  tokens: [
    {
      access: {
        type: String, 
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
}));


module.exports = {
  User
};
