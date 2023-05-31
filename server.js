const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const compression = require('compression');
const dB = require("./middlewares/db");
const bodyParser = require('body-parser');
dB.dbconnection();
app.use(compression());

app.use(bodyParser.json({ limit: "50mb", strict: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


app.use("", routes);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));