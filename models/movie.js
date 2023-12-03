const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },

    director: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => /^(https?|ftp):\/\/.*(jpeg|jpg|png|gif|bmp)$/i.test(url),
        message: 'Требуется URL',
      },
    },

    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => /^(https?|ftp):\/\/.*(jpeg|jpg|png|gif|bmp)$/i.test(url),
        message: 'Требуется URL',
      },
    },

    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => /^(https?|ftp):\/\/.*(jpeg|jpg|png|gif|bmp)$/i.test(url),
        message: 'Требуется URL',
      },
    },

    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },

    movieId: {
      type: Number,
      required: true,
    },

    nameRU: {
      type: String,
      required: true,
    },

    nameEN: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('movie', movieSchema);
