
// test/factories/movie.js

import faker from "faker";
import models from "../../models";

/**
 * Generate an object which container attributes needed
 * to successfully create a movie instance.
 *
 * @param  {Object} props Properties to use for the movie.
 *
 * @return {Object}       An object to build the movie from.
 */

const data = async (props = {}) => {
  const defaultProps = {
    title: faker.name.title(),
    video: "VHS",
    duration: faker.random.number(),
    release: faker.random.number(),
    rating: faker.random.number(),
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