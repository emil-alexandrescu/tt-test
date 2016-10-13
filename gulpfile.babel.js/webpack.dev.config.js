import webpack from 'webpack';
import webpackConfig from './webpack.config';

const devConfig = {
  ...webpackConfig,
  devtool: 'eval',
  entry: [
    ...webpackConfig.entry,
    'webpack-dev-server?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server'
  ],
  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin()
  ]
}
