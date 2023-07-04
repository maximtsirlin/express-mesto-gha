const Card = require('../models/card');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'Ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user.cardId;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Некорректные данные при создании карточки' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные для удаления карточки.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user.likeId } },
    { new: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные для лайка.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user.likeId } },
    { new: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки.' });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные для снятия лайка.' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Ошибка на сервере' });
      }
    });
};
