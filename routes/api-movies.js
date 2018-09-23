// *********************************************************************************
// api-movies.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the movies
  app.get("/api/movies", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Movie.findAll({}).then(function (dbMovie) {
      // We have access to the movies as an argument inside of the callback function
      res.json(dbMovie);
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // POST route for storing a new movie
  app.post("/api/movies", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our movie table. In this case we just we pass in an object with field properties
    db.Movie.create({
      title: req.body.title,
      video: req.body.video,
      duration: req.body.duration,
      release: req.body.release,
      rating: req.body.rating
    }).then(function (dbMovie) {
      // We have access to the new movie as an argument inside of the callback function
      res.json(dbMovie);
    });
  });

  // DELETE route for deleting movies. We can get the id of the movie to be deleted from
  // req.params.id
  app.delete("/api/movies/:id", function (req, res) {
    // We just have to specify which movie we want to destroy with "where"
    db.Movie.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbMovie) {
      res.json(dbMovie);
    });
  });

  // PUT route for updating movies. We can get the updated movie data from req.body
  app.put("/api/movies", function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Movie.update({
      title: req.body.title,
      video: req.body.video,
      duration: req.body.duration,
      release: req.body.release,
      rating: req.body.rating
    }, {
      where: {
        id: req.body.id
      }
    }).then(function (dbMovie) {
      res.json(dbMovie);
    });
  });
};