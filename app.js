require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

const router = require('./routes/index');

const errorHandler = require('./middlewares/errorHandler');

const { MONGODB_URL, PORT } = require('./utils/config');

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3001', // Разрешенный домен для разработки
    'https://denis.movies.nomoredomainsmonster.ru', // Разрешенный домен для продакшена (HTTPS)
    'http://denis.movies.nomoredomainsmonster.ru', // Разрешенный домен для продакшена (HTTP)
  ],
  credentials: true, // Разрешить отправку cookies с запросами из разрешенных доменов
};

app.use(cors(corsOptions));
app.use(helmet());

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}`);
});
