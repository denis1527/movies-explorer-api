const router = require('express').Router();
const NotFound404 = require('../error-handlers/not-found-404');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const signupRoute = require('./sign-up');
const loginRoute = require('./sign-in');
const signoutRoute = require('./sign-out');
const { authentication } = require('../middlewares/auth');
// Sign-up / Log in
router.use('/signup', signupRoute);
router.use('/signin', loginRoute);
router.use(authentication);
// After successful log in or registration:
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('/signout', signoutRoute);

// Non-existent routes
router.use('/*', (req, res, next) => next(new NotFound404('Указан некорректный путь в URL адресе')));

module.exports = router;
