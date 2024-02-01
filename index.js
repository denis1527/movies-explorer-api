const express = require('express');
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const { PORT, DB_ADDRESS } = require('./config');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
})
  .then(() => console.log('Mongodb is working'))
  .catch((err) => console.error(err));

const app = express();
app.use(cors({
  origin:
    [
      'http://localhost:3001',
      'https://movies.denis.nomoredomainsmonster.ru',
      'http://movies.denis.nomoredomainsmonster.ru'
    ],
  credentials: true,
}))

// Setup
app.use(helmet());
app.use(cookies());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Collecting requests logger
app.use(requestLogger);
app.use(limiter);
// Routes
app.use(routes);
// Collecting errors logger
app.use(errorLogger);
// Errors
app.use(errors());
// ErrorsHandler
app.use(errorsHandler);
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
