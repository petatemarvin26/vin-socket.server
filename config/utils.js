const {ROOT_DIR} = require('./constants');

/**
 * @param {string} path
 * @returns {string}
 */
const resolve = (path) => {
  return ROOT_DIR + '/' + path;
};

module.exports = {
  resolve,
};
