// vue.config.js
module.exports = {
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
    }
}