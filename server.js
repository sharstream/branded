// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
 require('dotenv').config({
  silent: true
});
const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Passport Middleware
// =============================================================
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
// =============================================================
require("./routes/api-movies.js")(app);
require("./routes/api-users.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

//Server management
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
