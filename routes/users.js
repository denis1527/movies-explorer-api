const router = require('express').Router();

// Import controllers:
const { getCurrentUser, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');
// GET: Current User
router.get('/me', getCurrentUser);
// POST: Update User's name and email
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
