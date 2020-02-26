const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    noParse: [/jszip.js$/],
    rules: [
      {
        test: /\.s[ac]ss$/i, //Loader for the Sass file, minifies into one CSS
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
          },
        ]
        
      },
      {
        enforce: 'pre', //so it get's checked before any other compiler
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
            emitWarning: true,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      { test:  /\.(hbs|handlebars)$/, 
        loader: "handlebars-loader",
        options: {
            partialDirs: [path.join(__dirname, './src/partials')],
            inlineRequires: '\/img\/'
        }, 
      },
      {
        test: /\.(png|jpe?g|svg|ico)$/i,
        loader: 'url-loader',
        options: {
            limit: 30000,
            fallback: "file-loader",
            
            name: '[name].[ext]',
            outputPath: 'img'
          }
    },
    {
      test: /\.csv$/,
      loader: 'csv-loader',
      options:{
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    },
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: "file-loader",
        options: {
          url: false,
          name: "./fonts/[name].[ext]",
        }
      },
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/style.[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
      ignoreOrder: false
    }),
    new HtmlWebpackPlugin({
        title: "What to eat - Digital menu card",
        inject: true,
        template: "./src/index.hbs",
        minify: {
            html5: true,
            collapseWhitespace: true,
            caseSensitive: true,
            removeComments: true,
        }
    })
  ],
};
