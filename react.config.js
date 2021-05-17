const path=require('path')
module.exports={
    port:6666,
    // host:'',
    // publicPath:'',
    //别名
    alias:{
        '@':path.resolve(__dirname,'src')
    },
    //支持less
    module:{
        rules: [{
        test: /\.less$/,
        use: [{
        loader: 'style-loader',
        }, {
        loader: 'css-loader', // translates CSS into CommonJS
        }, {
        loader: 'less-loader', // compiles Less to CSS
         options: {
          //  lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
             modifyVars: {
               'primary-color': '#1DA57A',
               'link-color': '#1DA57A',
               'border-radius-base': '2px',
             },
             javascriptEnabled: true,
          //  },
         },
        }],
        }],
    },
     //服务器代理
    proxy:{
        '/soso':{
            target:'https://c.y.qq.com',
            changeOrigin:true
        },
        '/api':{
                target:'http://localhost:4444',//服务器地址
                changeOrigin:true
            }
    }
}