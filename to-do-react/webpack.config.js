const path = require('path');
module.exports = {
    mode: 'development',
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, "/bundle/"), // 所有输出文件的目标路径，绝对路径
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",//babel-loader将其他文件解析为js文件
                options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"] //babel-loader需要的预设
                }
            }
        ]
    }
};