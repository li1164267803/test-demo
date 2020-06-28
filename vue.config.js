// vue.config.js
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
        proxy: {
          '/svga': {  // 处理svga用服务地址图片的跨域问题
            target: 'https://live-test.puxinwangxiao.com/',
            changeOrigin: true, // 是否跨域
          }
        }
    },
    configureWebpack: config => {
        config.module.rules.push({
            test: /\.worker.js$/,
            use: {
                loader: 'worker-loader',
                options: { inline: true, name: 'workerName.[hash].js' }
            }
        })
    },
    parallel: false,
    chainWebpack: config => {
        // 在vue-cli2版本得时候需要加上这个防止本地报错"window is not defined"
        // config.output.globalObject('this')
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
              symbolId: 'icon-[name]'
            })
            .end()
    }
}