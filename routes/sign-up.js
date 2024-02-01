const router = require('express').Router();
const { createUser } = require('../controllers/sign-up');
const { signUpValidation } = require('../middlewares/validation');

router.post('/', signUpValidation, createUser);

module.exports = router;
