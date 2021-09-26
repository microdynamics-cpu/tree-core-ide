// @ts-nocheck
const path = require("path");
const package = require("./package.json");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    devServer: {
        compress: true,
        contentBase: path.resolve(__dirname, "./src/server/static"),
        historyApiFallback: {
            verbose: false
        },
        hot: true,
        inline: true,
        open: false,
        port: 8080,
        proxy: {
            // 将"http://localhost:8080/api/xxx"代理
            // 到"http://localhost:8081/api/xxx"上
            // Proxy "http://localhost:8080/api/xxx" to
            // "http://localhost:8081/api/xxx"
            "/api": {
                // 设置虚拟服务器目标地址
                // Set virtual server target address
                target: "http://localhost:8081",
                // 设置虚拟服务器并代为转发本地服务器请求
                // Set the virtual server and forward the local server
                // request on behalf of it
                chageOrigin: true,
                // 设置Https协议的SSL证书（如果接受无效证书，则将选项置为false）
                // Set SSL certificate for HTTPS protocol(set the option to
                // false if invalid certificate is accepted)
                secure: false,
            },
            // 将"http://localhost:8080/github/xxx"代理到"https://github.com/xxx"上
            // Proxy "http://localhost:8080/github/xxx" to "https://github.com/xxx"
            "/github": {
                target: "https://github.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/github": ""
                }
            },
            // 将"http://localhost:8080/gitee/xxx"代理到"https://gitee.com/xxx"上
            // Proxy "http://localhost:8080/gitee/xxx" to "https://gitee.com/xxx"
            "/gitee": {
                target: "https://gitee.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/gitee": ""
                }
            }
        },
        quiet: true
    },
    devtool: "eval-source-map",
    entry: {
        view: path.resolve(__dirname, "./src/client/client.js")
    },
    mode: "development",
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            },
            "css-loader", {
                loader: "postcss-loader",
                options: {
                    plugins: [
                        require("autoprefixer")
                    ]
                }
            }]
        }, {
            test: /\.(s(c|a)ss)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            },
            "css-loader", {
                loader: "postcss-loader",
                options: {
                    plugins: [
                        require("autoprefixer")
                    ]
                }
            }, {
                loader: "sass-loader",
                options: {
                    implementation: require("sass"),
                    sassOptions: {
                        indentedSyntax: true
                    }
                }
            }]
        }, {
            test: /\.js$/,
            use: ["babel-loader"],
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            use: ["vue-loader"]
        }, {
            test: /\.(jpe?g|gif|png|svg)$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 2048,
                    name: "img/[name].[hash:8].[ext]"
                }
            }]
        }, {
            test: /\.(aac|flac|mp3|mp4|ogg|wav|webm)$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 2048,
                    name: "media/[name].[hash:8].[ext]"
                }
            }]
        }, {
            // 字体不能使用url-loader，因为被转换成Base64后浏览器无法识别
            // The font cannot use URL loader because it cannot be recognized
            // by the browser after being converted to Base64
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "font/[name].[hash:8].[ext]"
                }
            }]
        }
    ]},
    output: {
        filename: "js/[name].bundle.[hash:8].js",
        chunkFilename: "js/[name].chunk.[chunkhash:8].js",
        path: path.resolve(__dirname, "./src/server/static"),
    },
    performance: {
        hints: "warning"
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "\n @author: myyerrol" +
                    "\n @date: " + new Date() +
                    "\n @version: " + package.version + "",
        }),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            minify: {
        　　    removeComments: true,
            　　collapseWhitespace: true
            },
            template: __dirname + "/src/client/client.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].bundle.[hash:8].css",
            chunkFilename: "css/[name].chunk.[chunkhash:8].css"
        }),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
    ],
    resolve: {
        alias: {
            "@client": __dirname + "/src/client",
            "@native": __dirname + "/src/native",
            "@server": __dirname + "/src/server"
        },
        extensions:[".css", ".js", "json", ".vue"]
    },
    stats: {
        children: false
    }
}

if (process.env.NODE_ENV.indexOf("production") !== -1) {
    module.exports.devtool = "none";
    module.exports.mode = "production";
    module.exports.optimization = {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        toplevel: true,
                    },
                    output: {
                        comments: false,
                    },
                    warnings: false,
                }
            })
        ],
        splitChunks: {
            automaticNameDelimiter: "-",
            chunks: "all",
        }
    };

    if (process.env.NODE_ENV.indexOf("stats") !== -1) {
        module.exports.plugins.push(
            new BundleAnalyzerPlugin()
        );
    }
    module.exports.plugins.push(
        new CompressionWebpackPlugin({
            test:  /\.js$|\.css$|\.html$/,
            algorithm: "gzip",
            deleteOriginalAssets: false,
            filename: "[path][base].gz",
            minRatio: 0.8,
            threshold: 0
        }),
        new OptimizeCssAssetsPlugin()
    );
}
