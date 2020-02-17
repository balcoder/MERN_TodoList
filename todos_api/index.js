const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


const todoRoutes = require('./routes/todos')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views')); //make views dir path visible
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('index.html'); //use(express.static...) above makes index visible
});

app.use('/api/todos', todoRoutes);

app.listen(port, function() {
  console.log("App is running on port :" + port);
})
