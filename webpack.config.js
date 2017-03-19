var webpack           = require('webpack');
var webpackDevServer  = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');// separate css
var CleanPlugin       = require('clean-webpack-plugin');// clean bulid file

var webpackConfig     = module.exports = {};//　init object
var production        = process.env.nodeEnv === 'production';// production environment

var domain            = process.env.domain; // your domain process.env.domain

// input
webpackConfig.entry　 =　{
  app:[
    // main
    './app.js',
  ],
};

webpackConfig.output = {
  path: './dist',
  publicPath: domain+'/dist/',
  filename: production? '[name].[hash].js': '[name].js'
};//　output

//loader
webpackConfig.module = {
    rules : [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader",
            publicPath: "./dist"
        })
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
       },
       {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/
        },
        {
          test: /\.(eot(|\?v=.*)|woff(|\?v=.*)|woff2(|\?v=.*)|ttf(|\?v=.*)|svg(|\?v=.*))$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
         },
         {
           test: /\.(png|jpg|gif)$/,
           use: [
             {
               loader: 'file-loader'
             }
           ]
          },
  ]
};

webpackConfig.plugins = [
  // make index.html
  new HtmlWebpackPlugin({
    title: 'easy-vue',
    filename: '../index.html',
    template: './index.template.html'
  }),
  // separate css file
  new ExtractTextPlugin({
    　filename: production? 'app.[hash].css': 'app.css',
    // 　disable: false,
    // 　allChunks: true
  })
];

/* production plugins need */
if (production) {
  webpackConfig.plugins.concat([
    // clean build file
    new CleanPlugin('dist')
    ]);
}
