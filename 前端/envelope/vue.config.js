module.exports = {
    publicPath: './',
    // // 输出目录路径
    // outputDir: 'dist',
    // // 放置静态资源的目录
    // assetsDir: 'static',
    // // html的输出路径
    // indexPath: 'index.html',
    pages: {
        index: {
            // 入口文件
            entry: 'src/main.js',
            // 模板文件
            template: 'public/index.html',
            // 在dist/index.html的输出文件
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    devServer: {
        open: true,
        proxy: 'http://localhost:3000'
    }
}
