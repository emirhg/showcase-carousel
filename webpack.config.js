const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";
const RELATIVE_SRC_PATH = "src";
const OUTPUT_DIR = "dist";
const DEFAULT_MODULE_TARGET = "web";

const sourcePath = path.join(__dirname, RELATIVE_SRC_PATH);

const config = {
  context: path.resolve(__dirname, RELATIVE_SRC_PATH),
  target: DEFAULT_MODULE_TARGET,
  entry: {
    index: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, OUTPUT_DIR),
    filename: "[name].js",
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, `${sourcePath}/assets/`),
      content: path.resolve(__dirname, `${sourcePath}/content/`),
      theme: path.resolve(__dirname, `${sourcePath}/theme/`),
      style: path.resolve(__dirname, `${sourcePath}/theme/style.sass`),
    },
  },
  devServer: {
    open: true,
    host: "localhost",
    liveReload: true,
    static: {
      directory: path.join(__dirname, OUTPUT_DIR),
    },
    watchFiles: {
      paths: [`${sourcePath}/**/*.*`],
      options: {
        usePolling: true,
      },
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "../README.md",
        },
        {
          from: "../package.json",
          transform: (_) => {
            const { devDependencies, scripts, ...packageJson } = JSON.parse(_);
            return JSON.stringify(packageJson, null, 2);
          },
        },
      ],
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: "raw-loader",
            options: {
              esModule: false,
            },
          },
          "pug-html-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "css-loader",
            options: {
              esModule: false,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins = [new CleanWebpackPlugin(), ...config.plugins];
  } else {
    config.mode = "development";
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: "index.pug",
        chunks: ["index"],
      })
    );
  }
  return config;
};
