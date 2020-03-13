const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: './',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { from: './src/assets', to: 'assets' },
      ]),
      new CompressionPlugin({
        test: /\.(js|css|html)$/,
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 不删除源文件
      }),
    ],
  },
  productionSourceMap: false,
};
