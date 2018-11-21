require('dotenv').config();
const express = require('express');
var createError = require('http-errors');
// const router = express.Router();
const cors = require('cors');

const app = express();
require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/votingapp', { useNewUrlParser: true });

const bodyParser = require('body-parser');
const logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRoute');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors({ origin: `http://localhost:3000` }))

app.use('/api', userRouter);
app.use('/api', indexRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

// app.use(function (req, res, next) {
//     res.status(404).send({ error: 'Not found' })
// });

app.use(function(req, res, next) {
    next(createError(404));
  });

module.exports = app


