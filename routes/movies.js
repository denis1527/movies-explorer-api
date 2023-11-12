const router = require('express').Router();

const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');
const {
  addMovieToDatabase,
  fetchMoviesFromDatabase,
  removeMovieFromDatabase,
} = require('../controllers/movies');

router.post('/', createMovieValidation, addMovieToDatabase);
router.get('/', fetchMoviesFromDatabase);
router.delete('/:id', deleteMovieValidation, removeMovieFromDatabase);

module.exports = router;
