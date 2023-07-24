const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, deleteLike,
} = require('../controllers/cards');
const { validateCardById, validateCreateCard } = require('../utils/validators/cardValidator');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:id', validateCardById, deleteCard);
router.put('/:id/likes', validateCardById, likeCard);
router.delete('/:id/likes', validateCardById, deleteLike);

module.exports = router;
