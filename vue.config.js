const path = require('path');

module.exports = {
  productionSourceMap: false,
  // pwa: {
  //   name: 'vue-demo2',
  //   themeColor: '#4dba87',
  //   msTileColor: '#000000',
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: 'black',
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     swSrc: 'public/service-worker.js'
  //   }
  // },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
  }
};