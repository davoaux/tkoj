const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes/router');
const api = require('./routes/api');

const port = process.env.PORT || 3001;

const app = express();

require('dotenv').config();
require('./config/database');

app.set('env', process.env.NODE_ENV);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.use('/', router);
app.use('/api', api);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
