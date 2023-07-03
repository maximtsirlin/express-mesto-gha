const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
// const { default: mongoose } = require('mongoose');


mongoose.connect('mongodb://localhost:27017/mestodb')

app.use(bodyParser.json());

app.use('/users', usersRouter);

app.listen(3001, () => {
    console.log("Сервер запущен!");
})