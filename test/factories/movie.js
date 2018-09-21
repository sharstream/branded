
// test/factories/movie.js

var faker = require("faker");
var models = require("../../models");

/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */

const data = async (props = {}) => {
  const defaultProps = {
    title: faker.internet.title(),
    video: faker.name.video(),
    duration: faker.name.duration(),
    release: faker.name.release(),
    rating: faker.name.rating(),
  };
  return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */

export default async (props = {}) =>
models.Movie.create(await data(props));