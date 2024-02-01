const Movie = require('../models/movie');
const BadRequest400 = require('../error-handlers/bad-request-400');
const NotFound404 = require('../error-handlers/not-found-404');
const RequestForbidden403 = require('../error-handlers/request-forbidden-403');

// Get All User's Movies:
const getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;

    const movies = await Movie.find({ owner });
    // Status 200:
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

// Post Movies:
const addMovieToFavorites = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const owner = req.user._id;

    // Add new movie to the database:
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });

    // Status 201:
    res.send(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Status 400:
      return next(new BadRequest400('Переданы некорректные данные при добавлении фильма в избранное.'));
    }
    // Status 500:
    return next(error);
  }
};

// Delete Movie(id):
const deleteMovieFromFavorites = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const movie = await Movie.findById(_id);
    // Status 404:
    if (!movie) {
      return next(new NotFound404(`Фильм с указанным _id: ${_id} не найден.`));
    }
    // if movie:
    const owner = String(movie.owner);

    // Status 403:
    if (owner !== req.user._id) {
      return next(new RequestForbidden403('Нет прав для удаления данного фильма.'));
    }

    await movie.deleteOne();

    res.send({ movie });
  } catch (error) {
    // Status 400:
    if (error.name === 'CastError') {
      return next(new BadRequest400('Переданы некорректные данные для удаления фильма из избранного.'));
    }

    // Status 500:
    return next(error);
  }
};

module.exports = { getMovies, addMovieToFavorites, deleteMovieFromFavorites };
