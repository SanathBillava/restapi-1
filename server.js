const express = require('express');
const assert = require('assert');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const proRoute = require('./route');
const config = require('./config/Db');
const PORT = Number(process.env.PORT || 3000);

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the global promise for mongoose
mongoose.Promise = global.Promise;

// db connection
mongoose
  .connect(config.DB, { useNewUrlParser: true })
  .then(res => {
    console.log('Database connected');
  })
  .catch(err => {
    assert.equal(null, err);
  });

// CORS => Cross origin Resource Sharing
app.use(cors());

// configure the route
// http://localhost:3000/
app.use('/', proRoute);

// port configure
app.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
});
