const router = require('express').Router();

const { registerUserValidation } = require('../utils/validation');
const { createUserAccount } = require('../controllers/users');

router.post('/signup', registerUserValidation, createUserAccount);

module.exports = router;
