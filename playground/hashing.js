const { SHA256, SHA512 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var message = 'some string';
var hash = SHA256(message).toString();
console.log(`Hash: ${hash}`);

var data = {
  id: 4
};

var token = jwt.sign(data, 'somesecret');
console.log(token);

var deconstruct = jwt.decode(token);
console.log('Decoded ', deconstruct);
/* var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret' ).toString()
} */

/* token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
  console.log('Data was not changed');
}else {
  console.log('Data was changed. Do not trust');
} */