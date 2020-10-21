'strict mode';

require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes/router');
const api = require('./routes/api');

const port = process.env.PORT || 3000;
const mongodb_uri = process.env.MONGODB_URI;

const app = express();

app.set('env', process.env.NODE_ENV);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(helmet());

app.use(router);
app.use('/api', api);

mongoose.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connection', () => console.log('Database connection succesfull'));
db.on('error', (err) => console.error(`Database error: ${err}`));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
