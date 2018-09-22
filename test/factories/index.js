var forEach = require("lodash");
var requireDirectory = require("require-directory");

const factories = requireDirectory(module, "./");

forEach(factories, (value, key) => {
  factories[key] = value.default;
});

export default factories;