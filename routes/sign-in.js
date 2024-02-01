const router = require('express').Router();
const { login } = require('../controllers/sign-in');
const { logInValidation } = require('../middlewares/validation');

router.post('/', logInValidation, login);

module.exports = router;
