import pxtorem from 'postcss-pxtorem';

export default {
  entry: "src/index.js",
  disableCSSModules: false,
  ignoreMomentLocale: true,
  publicPath: "/",
  browserslist: [
    "iOS >= 8", "Android >=4"
  ],
  commons: [
    {
      async: true,
      children: true,
      minChunks: 3,
    }
  ],
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: []
    })
  ],
  extraBabelPlugins: [
    "transform-decorators-legacy",
    "transform-class-properties",
    "array-includes",
    ["import", {
      "libraryName": "antd-mobile",
      "style": true
    }]
  ],
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr"
      ]
    },
    production: {
      extraBabelPlugins: []
    }
  },
  proxy: {
    "/client/api": {
      target: "https://weixintest.ybejia.com/",
      changeOrigin: true,
      logLevel: 'debug'
    }, 
    "/wechat/wx/": {
      target: "https://weixintest.ybejia.com/",
      changeOrigin: true,
      logLevel: 'debug'
    }
  }
}