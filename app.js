const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const usersRouter = require('./routes/users');
const usersCard = require('./routes/cards');
const { createUser } = require('./controllers/users');
const login = require('./controllers/login');

const { ERROR_NOT_FOUND } = require('./errors/errors');

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb');

// app.use((req, res, next) => {
//   req.user = {
//     _id: '64a2cab00f82806834dc94d1',
//   };
//   next();
// });

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  req.user = {
    _id: '649f378e602babba1d1a2872',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', usersCard);

app.use('*', (reg, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрошен несуществующий роут' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен! ${PORT}`);
});
