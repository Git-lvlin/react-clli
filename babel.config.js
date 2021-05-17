//js写法
module.exports={
    //预设
    presets:[
        ["@babel/preset-env",{}],//{}里面都是选项
        ["@babel/preset-react",{}]
    ],
    plugins: [
        //解决@的问题
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}