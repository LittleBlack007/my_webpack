const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',  // 开发环境下，代码错误追踪
  entry: './src/index.js',
  devServer:{  
    // 实时监控dist文件 有变化重新加载webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文
    // 件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server
    //根路径上的真实文件一样
    static: './dist', 
  },
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),  // 输出路径一定要绝对路径
    clean: true  // 输出bundle之前是否清空dist文件夹 
  },
  // 配置资源文件
  /**
   * asset/resourt 发送一个单独的文件并导出url
   * asset/inline 导出一个资源的 data URI。 
   * asset/source 导出资源的源代码。
   * asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。
  */
   module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
  plugins:[
    new HTMLWebpackPlugin({
      template: './index.html',  // 需要改造的文件模板（没有的话直接输出的时候直接生成一个空的html）
      filename: 'app.html', // 打包生成的文件名称。默认为 index.html
      inject: 'body'  // 打包出来的脚本挂在html标签位置
    })
  ]
}