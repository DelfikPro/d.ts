const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const process = require('process');
const moduleName = process.env.CRISTALIX_JSC_NAME || 'clientcode'
console.log("\x1B[33;1mSetting up workspace for module '" + moduleName + "'...\x1B[0m ");
if (!/^[A-Za-z0-9_-]+$/.test(moduleName)) throw new Error("Invalid MODULE_NAME: " + moduleName);

module.exports = {
//  entry: fs.readdirSync('./src/').map(file => `./src/${file}`),
  mode: 'production',
  output: {
    filename: moduleName + '.bundle.js',
    path: path.resolve('./build'),
    libraryTarget: 'this',
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    }
  },
  module: {
    rules: [
      {
        test: /.*\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'plugin=this;',
      raw: true,
      entryOnly: true
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
//    plugins: [new TsconfigPathsPlugin({
//    	configFile: __dirname + "/tsconfig.json",
//    	baseUrl: process.cwd(),
////    	files: ['hello']
//    })],
  }
};
