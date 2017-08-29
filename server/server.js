var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/1234123
  //404 - send back empty send
app.get('/todos/:id', (req, res) => {
  // res.send(req.params);
  var id = req.params.id;

  //valid id using isValid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }


  //findById
  //success
    //if todo - send it back
    // no todo - send back 404 with empty body
  //error
    //400 - and send empty body back
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});



app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo')
// });
//
// var otherTodo = new Todo({
//   text: '     Feed the cat'
// });
// otherTodo.save().then((doc) => {
//   console.log('Saved othertodo');
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save othertodo')
// });
// var otherTodo = new Todo({
//   text: '     Feed the cat'
// });
//
// var user = new User({
//   email: '  peace@fu.com'
// });
// user.save().then((doc) => {
//   console.log('Save user');
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save user')
// });
