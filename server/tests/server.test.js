const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  completed: true,
  completedAt: 333
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos)
      .then(() => {
        done();
      });
  });
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then(() => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('Get /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('Delete /todos/:id', () => {
  // toHexString is not a function error we had
  // it('should delete a todo', (done) => {
  //   var hexId = todos[1]._id.toHexString();
  //   request(app)
  //     .delete(`/todos/${hexId}`)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.todo._id).toBe(hexId);
  //     })
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //
  //       Todo.findById(hexId).then((todo) => {
  //         expect(todo).toNotExist();
  //         done();
  //       }).catch((e) => {
  //         done(e);
  //       });
  //     });
  //
  // });

  // it('should return 404 if todo not found', (done) => {
  //
  // });
  //
  // it('should return 404 if ObjectID is not valid', (done) => {
  //
  // });
});

describe('Patch /todos/:id', () => {
  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'This should be the next Text';

    //grab id of first item
    //update text, set completed true
    //200
    //text is changed, completed is true, completedAt is a number .toBeA
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    //grab id of second item
    //update text, set completed to false
    //200
    //text is changed, completed false, completedAt is null .toNotExist

    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the next Text!!';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
