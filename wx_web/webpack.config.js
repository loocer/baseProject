import { WebPlugin } from 'web-webpack-plugin';
import WebpackRequireHttp from 'webpack-require-http';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ContentReplacerWebpackPlugin from 'webpack-content-replacer-plugin';
import path from 'path';

const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),
  path.resolve(__dirname, 'src/assets/fonts'),
  path.resolve(__dirname, 'public/bank'),
];
const now = (new Date()).getTime();

module.exports = (config) => {
  config.output.chunkFilename = 'js/[id].[hash:8].chunk.js';
  config.module.rules.forEach((item) => {
    if (item.test && item.test.toString() === '/\\.(js|jsx)$/') {
      item.use.push(`preprocess-loader${process.env.DEVELOPMENT ? '?+DEVELOPMENT' : ''}`);
    }
    if (item.loader && item.loader.indexOf('url-loader')) {
      if (item.exclude) item.exclude.push(/\.svg$/);
      if (item.options) item.options.limit = 5120;
    }
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: [{
      loader: 'file',
      options: {
        name: 'static/[name].[hash:8].[ext]',
      },
    }],
    exclude: svgSpriteDirs,
  });
  config.module.rules.push({
    test: /\.(svg)$/i,
    use: [require.resolve('svg-sprite-loader')],
    include : svgSpriteDirs, //eslint-disable-line
  });

  if (process.env.NODE_ENV === 'production') {
    const webPlugin = new WebPlugin({
      filename: 'script.js',
      template: './src/script.js',
      requires: ['index'],
    });

    config.output.filename = '[name].[hash:8].js';
    config.plugins.forEach((plugin) => {
      if (plugin.constructor.name === 'ExtractTextPlugin') plugin.filename = '[name].[hash:8].css';
    });
    config.plugins.push(webPlugin);
    webPlugin.toJSON = () => '{}';
    config.plugins.push(new ContentReplacerWebpackPlugin({
      modifiedFile: './dist/version.js',
      modifications: [
        {
          regex: /\$version/g,
          modification: now,
        },
      ],
    }));
    config.plugins.push(new ContentReplacerWebpackPlugin({
      modifiedFile: './dist/script.js',
      modifications: [
        {
          regex: /(.*index\.)([^.]*)(\.js.*)/g,
          modification: `/* eslint-disable */
          (function () {
            var $$script = document.createElement("script");
            $$script.src="/index.$2.js";
            $$script.async="async";
            var $$link = document.createElement("link");
            $$link.rel="stylesheet";
            $$link.href="/index.$2.css";
            document.head.appendChild($$link);
            document.head.appendChild($$script);
          })();`,
        },
      ],
    }));
  }

  // config.plugins = config.plugins.filter(p => p.constructor.name !== 'UglifyJsPlugin');

  // config.plugins.push(new BundleAnalyzerPlugin());

  config.externals = [WebpackRequireHttp.custom({
    rules: {
      '^jweixin$': 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js',
      '^gaode$': 'https://webapi.amap.com/maps?v=1.4.1&key=c09df952f7c5c4e68715a00650c2fc08',
    },
  })];

  return config;
};
