const path = require("path");
const webpack = require("webpack");

const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin=require("uglifyjs-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, "./src/views/dist"),
        historyApiFallback: true,
        inline: true,
        port: 8080
    },
    devtool: "eval-source-map",
    entry: path.resolve(__dirname, "./src/views/view.js"),
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                "vue-style-loader",
                "css-loader"
            ],
        }, {
            test: /\.s(c|a)ss$/,
            use: [
                "vue-style-loader",
                "css-loader", {
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass"),
                        sassOptions: {
                            indentedSyntax: true
                        }
                    }
                }
            ]
        }, {
            test: /\.js$/,
            use: ["babel-loader"],
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            use: ["vue-loader"]
        }, {
            test: /\.(png|jpg|jpeg|svg|gif)$/,
            use: ["file-loader"]
        }]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "./src/views/dist")
    },
    performance: {
        hints: "warning"
    },
    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/views/view.html"
        }),
        // new ExtractTextPlugin("style.css"),
    ]
}

if (process.env.NODE_ENV === "production") {
    module.exports.devtool = "none";
    module.exports.mode = "production";
    module.exports.optimization = {
        minimizer: [
            new UglifyJsPlugin()
        ]
    };
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "production"
            }
        })
    ]);
}
