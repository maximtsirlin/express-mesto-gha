const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000, MONGODB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(MONGODB);

app.use('/', authRoutes);
app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);
app.use('*', (reg, res) => {
  res.status(404).send({ message: 'Запрошен несуществующий роут' });
});

app.use((req, res, next) => {
  req.user = {
    _id: '649f378e602babba1d1a2872',
  };
  next();
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен ${PORT}`);
});
