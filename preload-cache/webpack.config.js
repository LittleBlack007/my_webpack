const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const yamljs = require('yamljs');
const json5 = require('json5');
const toml = require('toml');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',  // 开发环境下，代码错误追踪
  /**
   * 多入口配置
   * index.bundle.js 1.41mib(引入了lodash)
   * another.bundle.js 1.37MiB(引入了lodash)
  */
  //  entry: { 
  //    index: './src/index.js', 
  //    another: './src/another.js' 
  // },

  /**
   * 正常多入口是不会对公共模块代码进行分离的，要配合 dependOn 使用
   * 公共库不会被打包在index.js 和 another.js 中
   * 公共代码会打包到share.js 中
  */
  // entry: {
  //   index: {
  //     import: './src/index.js',
  //     dependOn: 'shared',
  //   },
  //   another: {
  //     import: './src/another.js',
  //     dependOn: 'shared',
  //   },
  //   shared: 'lodash'
  // },

  /**
   * 使用SplitChunkPlugin插件去重和分离代码 一步到位
   * 在optimization配置该插件
   * webpack5自带的插件
  */
  // entry:{
  //   index: './src/index.js', 
  //   another: './src/another.js' 
  // },

  /**
   * 动态导入
   * 使用import().then 的方式导入的库，会自动打包为一个bundle文件中
   * 如果动态导入和静态导入混合用在一个文件里面，需要开启splitChunkPlugin才能抽离公共部分
   * index.js import _ from 'lodash'
   * lodash 会被打包到index.js中，动态引用的lodash直接在index.js中导入，不再单独产生一个文件
   * 解决方法：重新开启splitChunkPlugin
  */
  entry:{
    index: './src/index.js', 
  },

  devServer:{  
    // 实时监控dist文件 有变化重新加载webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文
    // 件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server
    //根路径上的真实文件一样
    static: './dist', 
  },
  output:{
    // // 多入口需要filename 名字有区别，所以需要加入[name]
    // filename: '[name].bundle.js',

    /**
     * 使用contenthash 配合缓存使用
     * 更新后的代码因为hash值发生变化，导致文件名发生从而浏览器端获取到最新的文件
     * 
    */
    filename: 'scripts/[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),  // 输出路径一定要绝对路径
    clean: true,  // 输出bundle之前是否清空dist文件夹 
    // 配置资源文件 模块化打包名 配置  优先级体育 rules 的 generator
    // contenthash 文件内容hash值 ext 扩展名
    assetModuleFilename: 'images/[contenthash][ext]'
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
        /**
        * 字体类型 woff|woff2|eot|ttf|otf
        */
        test: /\.(png|woff|woff2|eot|ttf|otf)$/i, 
        type: 'asset', // 介于resource(文件引用)和inline之间
        generator: {
          filename: 'images/[contenthash][ext]',
        }
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline', // 将文件转化为URI(base64)格式
      },
      {
        test: /\.txt$/i,
        type: 'asset/source',  // 导出资源的源码
      },
      {
        test: /\.(css|less)$/i,
        /**
         * css-loader 引入css文件的时候，解析css文件，不然导入不成功
         * style-loader 将解析完成之后css代码放到app.html中<head><style>...</style></head>
         * use: ['style-loader','css-loader','less-loader']
         * MiniCssExtractPlugin.loader  将解析完的样式提出到一个文件中
        */
         use: [MiniCssExtractPlugin.loader,'css-loader','less-loader']
      },
      {
        test: /\.(csv|tsv)$/i,
        use:['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      },
      /**
       * 如果 Rule.type 被设置成 'json'，
       * 那么 Rules.parser.parse 选择可能会是一个方法，
       * 该方法实现自定义的逻辑，以解析模块的源和并将它转换成 JavaScript 对象。 
       * 它可能在没有特定加载器的时候，对将 toml, yaml 
       * 和其它非 JSON 文件导入成导入非常有用：
      */
      {
        test: /\.toml$/i,
        type: 'json',
        parser:{
          parse: toml.parse
        }
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser:{
          parse: yamljs.parse
        }
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser:{
          parse: json5.parse
        }
      },
      /**
       * babel-loader 在webpack里面应用babel解析ES6的桥梁
       * @babel/core babel核心模块 将es6代码转成低版本es5代码格式（不包括一些es6的新属性，主要是一些格式上的转化）
       * @babel/preset-env ：babel预设，一组babel插件组合
       * @babel/runtime 包含了regeneratorRuntime运行时需要, 转化之后会有一些包的依赖，这个包含了转换之后一些包的需要
       * @babel/plugin-transform-runtime 这个插件会在需要regeneratorRuntime的地方自动require导包，编译时需要
       * 
      */
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不对地方放模块进行转化
        use: {  // 需要对loader 进行配置，使用对象的形式
          loader: 'babel-loader',
          options:{
            presets: ['@babel/preset-env'],
            plugins:[
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      }
    ]
  },
  plugins:[
    new HTMLWebpackPlugin({
      template: './index.html',  // 需要改造的文件模板（没有的话直接输出的时候直接生成一个空的html）
      filename: 'app.html', // 打包生成的文件名称。默认为 index.html
      inject: 'body'  // 打包出来的脚本挂在html标签位置
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin(), // 压缩css代码 需要将mode:production
    ],

    // webpack5自带的插件 分离和去重公共模块的代码，打包到独立的文件中
    // splitChunks:{
    //   chunks: 'all',
    // },

    /**
     * 缓存第三方库
     * 对于一些第三方库一般是不会发生变化的，可以提取单独的chunk文件中
     * 利用client长效缓存机制，命中缓存消除请求，减少想server获取资源
    */
    splitChunks:{
      cacheGroups:{
        vendor:{
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}