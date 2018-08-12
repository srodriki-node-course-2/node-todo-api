const request = require('supertest');
const expect = require('chai').expect;
const { ObjectID } = require('mongodb');

const { app } = require('../../server');
const { Todo } = require('../../models/todo');

const todos = [
  {
    text: 'first test todo',
    _id: new ObjectID()
  },
  {
    text: 'second test todo',
    _id: new ObjectID(),
    completed: true,
    completedAt: 333
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
        expect(res.body.todo.text).to.be.equals(todos[0].text);
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

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).to.be.equals(hexId);

      }).end((err, res) => {
        if (err) {
          return done(err); // error gets rendered by mocha.
        }

        //query db using findbyId
        Todo.findById(hexId).then((todo) => {
          expect(todo).to.not.exist; // should not be there anymore.
          done();
        }).catch((e) => {
          done(e);
        })
      })
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString(); // some random id
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    var hexId = '323424324'; // invalid id
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('Should update an existing todo, completing it', (done) => {
    var hexId = todos[0]._id.toHexString();
    var completedTodo = {
      completed: true
    }
    request(app)
      .patch(`/todos/${hexId}`)
      .send(completedTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).to.be.true;
        expect(res.body.todo.completedAt).to.exist;
        expect(res.body.todo.completedAt).to.be.approximately(new Date().getTime(), 1000);
      }).end((err, res) => {
        if (err) {
          return done(err);
        }
        //query db using findbyId
        Todo.findById(hexId).then((todo) => {
          expect(todo.completed).to.be.true; 
          done();
        }).catch((e) => {
          done(e);
        });
      });
    
  });

  it('Should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var todo = {
      completed: false
    }
    request(app)
      .patch(`/todos/${hexId}`)
      .send(todo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).to.be.false;
        expect(res.body.todo.completedAt).to.not.exist;
      }).end((err, res) => {
        if (err) {
          return done(err);
        }
        //query db using findbyId
        Todo.findById(hexId).then((todo) => {
          expect(todo.completed).to.be.false; 
          expect(todo.completedAt).to.not.exist;
          done();
        }).catch((e) => {
          done(e);
        });
      });
    
  });

  it('Should return 404 if todo does not exist', (done) => {
    var hexId = new ObjectID().toHexString(); // some random id
    var todo = {};
    request(app)
      .patch(`/todos/${hexId}`)
      .send(todo)
      .expect(404)
      .end(done);
  })

  it('Should return 404 if id is not valid todo', (done) => {
    var hexId = 'dsadsa43224'; // some random id
    var todo = {};
    request(app)
      .patch(`/todos/${hexId}`)
      .send(todo)
      .expect(404)
      .end(done);
  })
});