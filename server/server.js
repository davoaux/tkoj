"strict mode";

require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const router = require("./routes/router");

const port = process.env.PORT || 3000;
const mongodb_uri = process.env.MONGODB_URI;

const app = express();

app.set("env", process.env.NODE_ENV);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(helmet());

app.use(router);

mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log("Error! Could not connect to mongodb: " + err);
    process.exit(0);
  });

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
