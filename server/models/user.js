const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail,
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
});

UserSchema.methods.talk = function() {
  var usr = this;
  console.log(this.email);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'secretvalue').toString();
 
  user.tokens.concat([{
    access,
    token
  }]);
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.toJson = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
}

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
