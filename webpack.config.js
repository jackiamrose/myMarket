/**
 * Created by user-pc on 2017/8/18.
 */

var webpack =require('webpack');//引入webpack的js打包模块

var ExtractTextPlugin=require('extract-text-webpack-plugin');   //引入单独打包css的模块

var HtmlWebpackPlugin=require('html-webpack-plugin');//引入单独打包html的模块

/*环境变量的配置 dev /online */
var WEBPACK_ENV =process.env.WEBPACK_ENV || 'dev';//获取nodejs下面的环境变量

/*html模板公共对象*/
var getHtmlConfig=function(name,title){
   return {
        template :'./src/view/'+name+'.html',
        filename:'/view/'+name+'.html',
        title:title,
        inject:true,
        hash:true,
        chunks:['common',name]
    }
};

//webpack config配置
var config={
    entry:{  //文件入口模块
        'common':['./src/page/common/index.js'],//公共模块
        'index':['./src/page/index/index.js'],//首页
        'list':['./src/page/list/index.js'],//产品列表
        'detail':['./src/page/detail/index.js'],//产品信息
        'login':['./src/page/login/index.js'],
        'register':['./src/page/register/index.js'],
        'result':['./src/page/result/index.js'],
        'reset-pass':['./src/page/reset-pass/index.js'],
        'user-center':['./src/page/user-center/index.js'],
        'user-update-pass':['./src/page/user-update-pass/index.js']

    },
    output:{  //文件输出模块
      path:'./dist/',
      publicPath:'/dist/',//生成文件的js地址
      filename:'js/[name].js'
    },
    externals:{  //引入外部模块，并可以引用模块
        'jquery':'window.jQuery',
        'Swiper':'window.Swiper'

    },
    module:{  //模块依赖加载，css一般默认为到js里加载，会导致出现看空白
        loaders:[
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract('style-loader','css-loader') //"style-loader!css-loader"
            },{
                test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=9800&name=image/[name].[ext]',
                options:{
                    publicPath:'/'
                }
            },
            {
                test:/\.string$/,
                loader:'html-loader'
            }

        ]
    },
    resolve:{
        alias:{
            /*配置文件别名*/
            node_modules: __dirname + '/node_modules',
            util:__dirname + '/src/util',
            page:__dirname +'/src/page',
            view:__dirname +'/src/view',
            image:__dirname + '/src/image',
            service:__dirname +'/src/service'
        }
    },
    plugins:[   //独立模块打包插件
        new webpack.optimize.CommonsChunkPlugin({   //引入webpack模块才能打包公共js模块
            name:'common',//公共样式打包
            filename:'js/base.js'
        }),
        /*引入ExtractTextPlugin模块才能打包成css模块*/
        new ExtractTextPlugin("css/[name].css"),      //
        /*引入HtmlWebpackPlugin模块打包html文件*/
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','产品信息')),

        new HtmlWebpackPlugin(getHtmlConfig('result','注册结果')),
        new HtmlWebpackPlugin(getHtmlConfig('login','登录')),
        new HtmlWebpackPlugin(getHtmlConfig('reset-pass','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('register','免费注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-update-pass','修改密码'))
    ]

};

if('dev' === WEBPACK_ENV){ //判断运行环境，如果为开发环境添加下列地址；否则线上环境则不添加
    config.entry.common.push('webpack-dev-server/client?http://localhost:8081/')
}

module.exports=config;

