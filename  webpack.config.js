const fs   = require("fs");
const path = require("path");

const packageConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));
const externals = Object.keys(packageConfig.dependencies);
externals.push("vscode");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "extension.js",
        libraryTarget: "commonjs2",
        clean: true
    },
    devtool: "source-map",
    target: "node",
    node: {
        fs: "empty"
    },
    externals: externals,
    module: {
        rules: [{
            test: /\.s(c|a)ss$/,
            use: [
                "vue-style-loader",
                "css-loader",
                {
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass"),
                        sassOptions: {
                            indentedSyntax: true
                        },
                    },
                },
            ]
        }, {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }]
    },
    resolve: {
        modules: [path.resolve("./node_modules"), path.resolve("./src")],
        extensions: [".js"]
    }
}
