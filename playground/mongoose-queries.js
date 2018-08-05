const {ObjectID} = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

var id = '5b7624b36c80e3328c96657c34';

/* Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
})

Todo.findOne({ _id: id }).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo', todo);
});
 */
if (!ObjectID.isValid(id)) {
  return console.log('The id provided is invalid');
}
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by Id', todo);
}).catch((e) => {
  console.log(e);
})