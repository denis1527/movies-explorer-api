const RESPONSE_MESSAGES = require('../utils/constants');

const INACCURATE_DATA_ERROR = require('../errors/customInaccurateDataError'); // 400
const FORBIDDEN_ERROR = require('../errors/customForbiddenError'); // 403
const NOT_FOUND_ERROR = require('../errors/customNotFoundError'); // 404

const error400 = RESPONSE_MESSAGES['400'];
const { cast } = (error400 && error400.users) || {};
const { validationSaving, accessRightsDeletion } = RESPONSE_MESSAGES[403].movies;
const { userIdNotFound, dataNotFound } = RESPONSE_MESSAGES[404].movies;

const Movie = require('../models/movie');

function addMovieToDatabase(req, res, next) {
  const {
    country,
    director,
    duration,
    releaseYear,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    releaseYear,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      const { _id: dbMovieId } = movie;
      res.status(201).send({ message: dbMovieId });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new INACCURATE_DATA_ERROR(validationSaving));
      } else {
        next(err);
      }
    });
}

function fetchMoviesFromDatabase(req, res, next) {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .populate('owner', '_id')
    .then((movies) => {
      if (!movies.length) {
        throw new NOT_FOUND_ERROR(userIdNotFound);
      }
      res.send(movies);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new INACCURATE_DATA_ERROR(cast));
      } else {
        next(err);
      }
    });
}

function removeMovieFromDatabase(req, res, next) {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NOT_FOUND_ERROR(dataNotFound);
      }

      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() !== userId) {
        throw new FORBIDDEN_ERROR(accessRightsDeletion);
      }

      return movie.deleteOne();
    })
    .then(() => res.send({ message: null }))
    .catch(next);
}

module.exports = {
  addMovieToDatabase,
  fetchMoviesFromDatabase,
  removeMovieFromDatabase,
};
