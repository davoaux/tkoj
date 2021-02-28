const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('connection', () => console.log('Database connection established'));

db.on('error', (err) => {
  console.error.bind(console, `Database error: ${err}`);
  process.exit();
});
