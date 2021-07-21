// @ts-nocheck
const path = require("path");
const package = require("./package.json");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    devServer: {
        compress: true,
        contentBase: path.resolve(__dirname, "./src/views/dist"),
        historyApiFallback: true,
        hot: true,
        inline: true,
        open: true,
        port: 8080
    },
    devtool: "eval-source-map",
    entry: {
        // home: path.resolve(__dirname, "./src/views/home/js/home.js"),
        libs: path.resolve(__dirname, "./src/views/lib/js/lib.js"),
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
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "font/[name].[hash:8].[ext]"
                }
            }]
        }
    ]
    },
    output: {
        filename: "js/[name].bundle.[hash:8].js",
        chunkFilename: "js/[name].chunk.[chunkhash:8].js",
        path: path.resolve(__dirname, "./src/views/dist"),
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
        // new HtmlWebpackPlugin({
        //     chunks: ["home"],
        //     filename: "home.html",
        //     minify: {
        // 　　    removeComments: true,
        //     　　collapseWhitespace: true
        //     },
        //     template: __dirname + "/src/views/view.html"
        // }),
        // new HtmlWebpackPlugin({
        //     chunks: ["libs"],
        //     filename: "libs.html",
        //     minify: {
        // 　　    removeComments: true,
        //     　　collapseWhitespace: true
        //     },
        //     template: __dirname + "/src/views/view.html"
        // }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            minify: {
        　　    removeComments: true,
            　　collapseWhitespace: true
            },
            template: __dirname + "/src/views/view.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].bundle.[hash:8].css",
            chunkFilename: "css/[name].chunk.[chunkhash:8].css"
        }),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin()
    ],
    stats: {
        children: false
    }
}

if (process.env.NODE_ENV === "production") {
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
    module.exports.plugins.push(
        new BundleAnalyzerPlugin(),
        // new CompressionWebpackPlugin({
        //     test:  /\.js$|\.css$|\.html$/,
        //     algorithm: "gzip",
        //     deleteOriginalAssets: false,
        //     filename: "[path][base].gz",
        //     minRatio: 0.8,
        //     threshold: 0
        // }),
        new OptimizeCssAssetsPlugin()
    );
}
