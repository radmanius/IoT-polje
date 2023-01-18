const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common.js");
const {
    merge
} = require("webpack-merge");
const {
    ModuleFederationPlugin
} = require("webpack").container;


module.exports = merge(common, {

    output: {
        publicPath: "/ui/"
    },


    mode: "production", // mode for build-in optimizations to correnspond for each environment
    plugins: [
        // perform wide range of tasks like bundle optimization, asset management and injection of environment variables.
        new HtmlWebpackPlugin({
            // generates an HTML and automatically injects all your generated bundles
            template: "./src/index.html",
            favicon: "./src/icon.ico",
        }),
        new webpack.DefinePlugin({
            process: {
                env: {
                    REACT_APP_KEY: '"REACT_APP_KEY"'
                }
            },
        }),
        new ModuleFederationPlugin({
            name: "react-typescript",
        }),
    ],
    module: {
        // determine how the different types of modules within a project will be treated
        rules: [{
                test: /\.ts$|tsx/, // Include all modules that pass test assertion
                exclude: /node_modules/, // Exclude all modules matching any of these conditions
                loader: require.resolve("babel-loader"), // which loader to use
                options: {
                    rootMode: "upward",
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.png|jpg|gif$/,
                use: ["file-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
});