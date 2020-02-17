// each todo will consist of name, completed and created_date

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name cannot be blank'
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

// compile into model

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
