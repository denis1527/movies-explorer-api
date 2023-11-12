const router = require('express').Router();

const { setCurrentUserInfoValidation } = require('../utils/validation');
const { fetchCurrentUserInfo, modifyCurrentUserInfo } = require('../controllers/users');

router.get('/me', fetchCurrentUserInfo);
router.patch('/me', setCurrentUserInfoValidation, modifyCurrentUserInfo);

module.exports = router;
