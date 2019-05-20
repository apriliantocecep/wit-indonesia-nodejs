var express = require('express'),
  bodyParser = require('body-parser');

// port
var port = process.env.PORT || 3000;

// create app
const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configuring database
const database = require('./app/configs/database');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// connecting to db
mongoose.connect(database.url, {
  useNewUrlParser: true
})
.then(() => console.log('Database connected'))
.catch((error) => {
  console.error('Could not connect to the database', error);
  process.exit();
});

// routes
var routes = require('./app/routes');
routes(app);

// middleware
app.use(function(req, res) {
  res.status(404).send({
    message: req.originalUrl + ' not found'
  })
});

// listen for request
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});