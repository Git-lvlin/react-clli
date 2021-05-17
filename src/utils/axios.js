import axios from 'axios'

//创建一个实例
const instance=axios.create({
    baseURL:'http://localhost:8888/api/v1',//自己项目端口
    timeout:5000,
    headers:{}
})


//设置请求拦截
instance.interceptors.request.use(function (config) {
  //保存token,其他地方可以通过
  config.headers['Authorization'] = localStorage.getItem('token')
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

//设置响应拦截
instance.interceptors.response.use(function (response) {
    //过滤
    let res=response.data.data
    return res;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance