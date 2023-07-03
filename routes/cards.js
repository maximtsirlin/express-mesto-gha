const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, deleteLikes,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', deleteLikes);

module.exports = router;
