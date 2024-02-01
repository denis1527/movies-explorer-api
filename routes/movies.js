const router = require('express').Router();
const { getMovies, addMovieToFavorites, deleteMovieFromFavorites } = require('../controllers/movies');
const { addMovieToFavoritesValidation, deleteMovieFromFavoritesValidation } = require('../middlewares/validation');
// GET: Movies From user's Favorites
router.get('/', getMovies);
// POST: Add Movie To Favorites
router.post('/', addMovieToFavoritesValidation, addMovieToFavorites);
// DELETE: Remove Movie From Favorites
router.delete('/:_id', deleteMovieFromFavoritesValidation, deleteMovieFromFavorites);

module.exports = router;
