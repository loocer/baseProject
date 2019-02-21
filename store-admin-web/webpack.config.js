import { WebPlugin } from 'web-webpack-plugin';
import path from 'path';

module.exports = (config) => {
  config.output.chunkFilename = 'js/[id].[hash:8].chunk.js';
  config.module.loaders.forEach((item) => {
    if (item.test && item.test.toString() === '/\\.(js|jsx)$/') {
      item.loader = `babel!preprocess${process.env.DEVELOPMENT ? '?+DEVELOPMENT' : '?+PRODUCT'}`;
    }
  });
  config.resolve.alias = {
    constants: path.join(__dirname, './src/constants.js'),
  };

  if (process.env.NODE_ENV === 'production') {
    config.output.publicPath = '';
    config.output.filename = '[name].[hash:8].js';

    config.plugins.forEach((plugin) => {
      if (plugin.constructor.name === 'ExtractTextPlugin') {
        plugin.filename = '[name].[hash:8].css';
      }
    });
    config.plugins.push(
      new WebPlugin({
        filename: 'index.html',
        template: './src/index.html',
        requires: ['index'],
      },
    ));
  } else {
    config.devtool = "sourcemap";
  }
  return config;
};
