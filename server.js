// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
 require('dotenv').config({
  silent: true
});
var express = require("express");
// const session = require("express-session");
// const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
var bodyParser = require("body-parser");

// Globals
// Load the Sign-In Widget module
var OktaSignIn = require('@okta/okta-signin-widget');
var signInWidget = require("./config/oauth")(OktaSignIn);
signInWidget.renderEl({el: '#widget-container'}, widgetSuccessCallback, widgetErrorCallback);

// const OKTA_ISSUER_URI = process.env.OKTA_ISSUER_URI;
// const OKTA_CLIENT_ID = process.env.OKTA_CLIENT_ID;
// const OKTA_CLIENT_SECRET = process.env.OKTA_CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const SECRET = process.env.SECRET;

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-movies.js")(app);

// app.use(session({
//   cookie: {httpOnly: true},
//   secret: SECRET
// }));

//Authentication
function widgetSuccessCallback(res) {
  var key = '';
  if (res[0]) {
    key = Object.keys(res[0])[0];
    signInWidget.tokenManager.add(key, res[0]);
  }
  if (res[1]) {
    key = Object.keys(res[1])[0];
    signInWidget.tokenManager.add(key, res[1]);
  }
  if (res.status === 'SUCCESS') {
    var token = signInWidget.tokenManager.get(key);
    console.log("Logged in to Okta and issued token:");
    console.log(token);
    console.log("Reload this page to start over.");
    alert("Logged in! Check your developer console for details");
  }
}

function widgetErrorCallback(err) {}
// let oidc = new ExpressOIDC({
//   issuer: OKTA_ISSUER_URI,
//   client_id: OKTA_CLIENT_ID,
//   client_secret: OKTA_CLIENT_SECRET,
//   redirect_uri: REDIRECT_URI,
//   routes: {
//       callback: {
//           defaultRedirect: "/dashboard"
//       }
//   },
//   scope: "openid profile"
// });

// app.use(oidc.router);
// Syncing our sequelize models and then starting our Express app
// =============================================================

//Server management
// oidc.on("ready", () => {
  db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
      console.log("Server listening on: http://localhost:" + PORT);
    });
  });
// });

// oidc.on("error", err => {
//   console.error(err);
// });
