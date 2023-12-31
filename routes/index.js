const router = require('express').Router();

const routeSignup = require('./signup');
const routeSignin = require('./signin');

const auth = require('../middlewares/auth');

const routeUsers = require('./users');
const routeMovies = require('./movies');

const INACCURATE_DATA_ERROR = require('../errors/customNotFoundError');

router.use('/', routeSignup);
router.use('/', routeSignin);

router.use(auth);

router.use('/users', routeUsers);
router.use('/movies', routeMovies);

router.use((req, res, next) => next(new INACCURATE_DATA_ERROR('Страницы по запрошенному URL не существует')));

module.exports = router;
