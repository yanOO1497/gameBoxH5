/**
 * Created by 信天翁 on 2018/1/20.
 */
// const path = require('path');
module.exports = {
    // context: path.resolve('./dev/js'),
    entry:{app: './dev/js/main.js'},//已多次提及的唯一入口文件,是以下代码的简写

    /**
     * 根据经验：每个 HTML 文档只使用一个入口起点。
     *
     * 向 entry 属性传入「文件路径(file path)数组」将创建“多个主入口(multi-main entry)”。
     * 在你想要多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk”时，传入数组的方式就很有用。
     * 示例：1）
     * 分离 应用程序(app) 和 第三方库(vendor) 入口
     *const config = {
     *     entry: {
     *       app: './src/app.js',
     *       vendors: './src/vendors.js'
     *     }
     *   };
     *示例2）
     *多页面应用程序
     *entry: {
        pageOne: './src/pageOne/index.js',
        pageTwo: './src/pageTwo/index.js',
        pageThree: './src/pageThree/index.js'
      }
     *
     *在 webpack 中配置 output 属性的最低要求是，将它的值设置为一个对象，包括以下两点：

     filename 用于输出文件的文件名。
     目标输出目录 path 的绝对路径
     *
     * */
    output: {
        path: __dirname +"/release/js",//打包后的文件存放的地方
        filename: "main.js"//打包后输出文件的文件名
    },
    module: {
       rules:[
           /*{
               test:/\.css/,
               use:[
                   'style-loader',
                   'css-loader'
               ]
           },
           {
               test: /\.(html)$/,
               use: {
                   loader: 'html-loader',
                   options: {
                       attrs: [':data-src']
                   }
               }
           },*/
           {
               test: /\.js$/,                              // 匹配打包文件后缀名的正则
               exclude: /(node_modules|bower_components)/, // 这些文件夹不用打包
               loader: 'babel-loader',
               query: {
                   presets: ['es2015']
               }
           }
       ]
    },
    // devServer: {
    //     contentBase: "./release",//本地服务器所加载的页面所在的目录
    //     historyApiFallback: true,//不跳转
    //     inline: true//实时刷新
    // },

}
