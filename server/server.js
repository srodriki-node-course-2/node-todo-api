var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

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
    Todo.findOne({_id: req.params.id}).then((todo) => {
        res.send(todo);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };