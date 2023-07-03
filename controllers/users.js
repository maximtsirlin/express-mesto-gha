const User = require('../models/user');


const createUser = (req, res) => {

    const { name, about, avatar } = req.body;
    User.create({ name, about, avatar })

    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });
}


const getUsers = (req, res) => {
    User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' }));
};




const getUser = (req, res) => {

    User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные.' });
      } else if (err.message === 'Not found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
      }
    });

}


const updateUser = (req, res) => {
    const { avatar } = req.body;
    const id = req.user._id;
    User.findByIdAndUpdate(id, { avatar }, { new: true })
      .orFail(() => new Error('Not found'))
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res
            .status(ERROR_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        } else if (err.message === 'Not found') {
          res
            .status(ERROR_NOT_FOUND)
            .send({ message: 'Пользователь с указанным _id не найден.' });
        } else {
          res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
        }
      });
}


const updateAvatar = (req, res) => {
    const { avatar } = req.body;
    const id = req.user._id;
    User.findByIdAndUpdate(id, { avatar }, { new: true })
      .orFail(() => new Error('Not found'))
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res
            .status(ERROR_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        } else if (err.message === 'Not found') {
          res
            .status(ERROR_NOT_FOUND)
            .send({ message: 'Пользователь с указанным _id не найден.' });
        } else {
          res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
        }
      });
}





module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser, 
    updateAvatar
}