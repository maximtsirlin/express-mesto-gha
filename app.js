const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const usersCard = require('./routes/cards');


mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '649f378e602babba1d1a2872',
  };
  next();
});

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/cards', usersCard);




app.listen(3001, () => {
  console.log('Сервер запущен!');
});
