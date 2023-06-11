const path = require("path");
module.exports = {
    entry: path.resolve(__dirname, "src/index.jsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "auto",
        filename: "index.js",
        chunkFilename: "[id].js"
    },
    resolve: {
        alias: {"@public": path.resolve(__dirname, "public")},
        extensions: [".js", ".jsx", ".json"]
    },
    devServer: {
        static: "./dist/",
        historyApiFallback: true,
        compress: true, open: true, port: 8080
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|json)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-react",
                            "@babel/preset-env"
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            },
            {
                test: /\.(css)$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png|svg|jpg|jpeg|webp|avif)$/i,
                type: "asset/resource"
            }
        ]
    }
};


