const fs = require(`fs`)
module.exports = {
    chainWebpack: config => {
        config.module
            .rule("html")
            .test(/\.html$/)
            .use("html-loader?exportAsEs6Default")
            .loader("html-loader?exportAsEs6Default")
            .end()

        // config.module
        //     .rule("snapsvg")
        //     .test(require.resolve("snapsvg"))
        //     .use("imports-loader?this=>window,fix=>module.exports=0")
        //     .loader("imports-loader")
        //     .end();
    },
    devServer: {
        https: {
            key: fs.readFileSync(`${__dirname}/self.key`),
            cert: fs.readFileSync(`${__dirname}/self.crt`)
        }
    },
    assetsDir: "./assets"
};
