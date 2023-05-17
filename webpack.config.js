const path = require('path');
const transform = require('ts-transform-paths').default;

const TS_FILES = /.(ts|tsx)/i;

const absolute = (dirpath) => {
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
  path: absolute('dist'),
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
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => transform(),
        },
      },
    },
  ],
};

/**
 * @type {import('webpack').Configuration['resolve']}
 */
const resolve = {
  extensions: ['.ts', '.js'],
  alias: {
    abstracts: absolute('src/abstracts'),
    classes: absolute('src/classes'),
    common: absolute('src/common'),
    interfaces: absolute('src/interfaces'),
    utils: absolute('src/utils'),
  },
};

/**
 * @type {import('webpack').Configuration['externals']}
 */
const externals = {
  bufferutil: 'bufferutil',
  'utf-8-validate': 'utf-8-validate',
};

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  target: 'node',
  entry,
  devtool: 'source-map',
  output,
  module: modules,
  resolve,
  externals,
};

module.exports = (env) => {
  if (env.production) {
    config.mode = 'production';
    return config;
  }
  return config;
};
