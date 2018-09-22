// test/models/movie.js
var assert = require("chai");

var models = require("../models");

var factories = require("../factories");
var truncate = require("../truncate");

// Give me a movie with all the defaults
const movie1 = await movieFactory();
// Give me a movie with a specific fields
const movie2 = await movieFactory({
  title: "The Hobbits",
  video: "DVD",
  duration: 120,
  release: 2012,
  rating: 4
});

describe("Movie model", () => {
  let movie;

  beforeEach(async () => {
    await truncate();

    movie = await factories.movieFactory();
  });

  it("should generate a movie from the factory", async () => {
    assert.isOk(movie.id);
  });

  it("should truncate the movie table with each test", async () => {
    const count = await models.Movie.count();

    assert.equal(count, 1);
  });
});
