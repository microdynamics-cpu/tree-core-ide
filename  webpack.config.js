
const fs   = require("fs");
const path = require("path");

const packageConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));
const externals = Object.keys(packageConfig.dependencies);
externals.push("vscode");

module.exports = {
    mode: "production",
    entry: __dirname + "/src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "extension.js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [{
            test: /\.s(c|a)ss$/,
            use: [
                "vue-style-loader",
                "css-loader",
                {
                    loader: "sass-loader",
                    // Requires sass-loader@^7.0.0
                    options: {
                        implementation: require("sass"),
                        indentedSyntax: true // optional
                    },
                    // Requires >= sass-loader@^8.0.0
                    // @ts-ignore
                    options: {
                        implementation: require("sass"),
                        sassOptions: {
                            indentedSyntax: true // optional
                        },
                    },
                },
            ]
        }]
    }
}
