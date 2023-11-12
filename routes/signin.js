const router = require('express').Router();

const { loginUserValidation } = require('../utils/validation');
const { authenticateUser } = require('../controllers/users');

router.post('/signin', loginUserValidation, authenticateUser);

module.exports = router;
