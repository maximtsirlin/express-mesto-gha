const router = require('express').Router();
const { login, createUser } = require('../controllers/login');
const { validateLogin, validateRegister } = require('../utils/validators/userValidator');

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);

module.exports = router;
