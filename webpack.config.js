const path = require('path');

const TS_FILES = /.(ts|tsx)/i;

const resolve = (dirpath) => {
  return path.resolve(__dirname, dirpath);
};

/**
 * @type {import('webpack').Configuration['entry']}
 */
const entry = {
  index: {
    import: './src/index.ts',
    filename: './index.js',
  },
};

/**
 * @type {import('webpack').Configuration['output']}
 */
const output = {
  path: resolve('dist'),
  library: {
    type: 'commonjs',
  },
};

/**
 * @type {import('webpack').Configuration['module']}
 */
const modules = {
  rules: [
    {
      test: TS_FILES,
      loader: 'ts-loader',
    },
  ],
};

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry,
  devtool: 'source-map',
  output,
  module: modules,
  resolve: {
    extensions: ['.js'],
  },
};

module.exports = (env) => {
  if (env.production) {
    config.mode = 'production';
    return config;
  }
  config.mode = 'development';
  return config;
};
