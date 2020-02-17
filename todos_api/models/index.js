const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://todolist2_admin:Tarpon101@ds263848.mlab.com:63848/todolist2',  { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = Promise; //  alows us use the promise syntax .then instead of having to write callback function(){}


// export our Todo model
module.exports.Todo = require("./todo");
