const path = require('path')
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: BASE_URL,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('$com', resolve('src/components'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        pathRewrite: {
          // '^/api': ''
        }
      },
      '/rest': {
        target: 'http://127.0.0.1:3001',
        // target:'http://img.flymeow.com',
        changeOrigin: true,
        pathRewrite: {
          // '^/api': ''
        }
      }
    }
  }
}
