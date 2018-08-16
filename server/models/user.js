const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const SECRET = 'secretvalue';

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
  var token = jwt.sign({_id: user._id.toHexString(), access}, SECRET).toString();
  console.log('generating auth token: ', access, token);
  user.tokens.push({
    access,
    token
  });
  console.log('current tokens: ', user.tokens);
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, SECRET);
  } catch(e) {
    return Promise.reject();
  }
  return User.findOne({ 
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

}

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
