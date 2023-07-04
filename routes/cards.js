const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', deleteLike);

module.exports = router;
