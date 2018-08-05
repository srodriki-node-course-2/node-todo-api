var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

const PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

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
        res.send(todo);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

module.exports = { app };