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
        historyApiFallback: true,
        hot: true,
        inline: true,
        open: false,
        port: 8080,
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
