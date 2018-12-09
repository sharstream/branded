const db = require("../models");
// Routes
// =============================================================
module.exports = router => {

  // @route   GET api/movies
  // @desc    route for getting all movies
  // @access  Private
  router.get("/api/movies", (req, res) => {
    // findAll returns all entries for a table when used with no options
    db.Movie.findAll({}).then(movies => {
      // We have access to the movies as an argument inside of the callback function
      res.json(movies);
    });
  });

  // @route   GET api/movie/:id
  // @desc    route for getting one movie
  // @access  Private
  router.get("/api/movie/:id", (req, res) => {
    // findAll returns all entries for a table when used with no options
    db.Movie.findOne({ id: req.params.id})
      .then( movie => {
        // We have access to the movies as an argument inside of the callback function
        res.json(movie);
      }).catch(err => console.log(err));
  });

  // @route   POST api/createMovie
  // @desc    route for storing a new movie
  // @access  Private
  router.post("/api/createMovie", (req, res) => {
    // create takes an argument of an object describing the item we want to
    // insert into our movie table. In this case we just we pass in an object with field properties
    db.Movie.create({
      title: req.body.title,
      video: req.body.video,
      duration: req.body.duration,
      release: req.body.release,
      rating: req.body.rating
    }).then(movie => {
      // We have access to the new movie as an argument inside of the callback function
      res.json(movie);
    }).catch(err => console.log(err));
  });

  // @route   DELETE api/deleteMovie/:id
  // @desc    route for deleting movies. We can get the id of the movie to be deleted from
  // req.params.id
  // @access  Private
  router.delete("/api/deleteMovies/:id", (req, res) => {
    // We just have to specify which movie we want to destroy with "where"
    db.Movie.destroy({
      where: {
        id: req.params.id
      }
    }).then(movie => {
      res.json(movie);
    }).catch(err => console.log(err));
  });

  // @route   PUT api/updateMovie/:id
  // @desc    route for updating movies. We can get the updated movie data from req.body
  // @access  Private
  router.put("/api/updateMovie/:id", (req, res) => {
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
    }).then(movie => {
      res.json(movie);
    }).catch(err => console.log(err));
  });
};