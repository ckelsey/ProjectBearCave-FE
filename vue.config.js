const fs = require(`fs`)
module.exports = {
    chainWebpack: config => {
        config.module
            .rule('html')
            .test(/\.html$/)
            .use('html-loader?exportAsEs6Default')
            .loader('html-loader?exportAsEs6Default')
            .end()
    },
    devServer:{
        https: {
            key: fs.readFileSync(`${__dirname}/self.key`),
            cert: fs.readFileSync(`${__dirname}/self.crt`),
        }
    }
}