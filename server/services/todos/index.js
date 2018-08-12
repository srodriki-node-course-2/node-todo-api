const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { Todo } = require('../../models/todo');
// var { User } = require('./models/user');

module.exports = (app) => {
  // POST /todos

  app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        
        res.status(400).send(e);
        
    });
  });

  // GET /todos
  app.get('/todos', (req, res) => {
    Todo.find({}).then((todos) => {
        res.send({todos});
    }).catch((e) => {
        res.status(400).send(e);
    })
  });

  //GET /todos/:id
  app.get('/todos/:id', (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id)) {
        res.status(404).send({
            error: `Id ${req.params.id} is invalid`
        });
        return false;
    }
    Todo.findOne({_id: req.params.id}).then((todo) => {
        if (!todo) {
            return res.status(404).send(null);
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
  });

  app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(req.params.id)) {
        res.status(404).send(null);
        return false;
    };
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send(null);
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    })
  });

  app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });
    

  });

};
