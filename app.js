const express = require('express');
const mongoose = require('mongoose');

const app = express();

const usersRouter = require('./routes/users');
const usersCard = require('./routes/cards');

const { ERROR_NOT_FOUND } = require('./errors/errors');

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '64a2cab00f82806834dc94d1',
  };
  next();
});

app.use(express.json()); // Используем express.json() вместо bodyParser.json()

app.use('/users', usersRouter);
app.use('/cards', usersCard);

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрошен несуществующий роут' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен! ${PORT}`);
});
