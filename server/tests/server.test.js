const request = require('supertest');
const expect = require('chai').expect;
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
  {
    text: 'first test todo',
    _id: new ObjectID()
  },
  {
    text: 'second test todo',
    _id: new ObjectID()
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
    
  }).then(() => {
    done();    
  });
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).to.be.equals(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).to.be.equal(1);
          expect(todos[0].text).to.be.equal(text);
          done();
        }).catch((e) => {
          done(e);
        });
      });  
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).to.be.equal(2);
          done();
        }).catch((e) => {
          done(e);
        });
      })
  })
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).to.be.equals(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should get single todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).to.be.equals(todos[0].text);
      })
      .end(done);

  });

  it('should return 404 for invalid id', (done) => {
    request(app)
      .get('/todos/trash')
      .expect(404)
      .end(done);
    
  });

  it('should return 404 for missing todo', (done) => {
    var id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});