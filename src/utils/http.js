import axios from 'axios';

const getBaseUrl = (env) => {
  let base = {
    production: '/',
    development: '/',
    test: 'http://localhost:8888',
  }[env];
  if (!base) {
    base = '/';
  }
  return base;
};

class NewAxios {
  constructor() {
    this.baseURL = getBaseUrl(process.env.NODE_ENV);
    this.timeout = 10000;
    this.withCredentials = true;
  }

setInterceptors = (instance, url) => {
  if (url) {
    // todo
  }
  instance.interceptors.request.use((config) => { // 请求拦截器
    // 配置token
    config.headers.AuthorizationToken = localStorage.getItem('AuthorizationToken') || '';
    return config;
  }, err => Promise.reject(err));

  instance.interceptors.response.use((response) => { // 响应拦截器
    // todo: 想根据业务需要，对响应结果预先处理的，都放在这里
    console.log();
    return response;
  }, (err) => {
    if (err.response) { // 响应错误码处理
      switch (err.response.status) {
        case '403':
        // todo: handler server forbidden error
          break;
        // todo: handler other status code
        default:
          break;
      }
      return Promise.reject(err.response);
    }
    if (!window.navigator.online) { // 断网处理
    // todo: jump to offline page
      return -1;
    }
    console.log(err);
    return Promise.reject(err);
  });
}

request(options) {
// 每次请求都会创建新的axios实例。
  const instance = axios.create();
  const config = { // 将用户传过来的参数与公共配置合并。
    baseURL: this.baseURL,
    timeout: this.timeout,
    withCredentials: this.withCredentials,
    ...options,
  };
    // 配置拦截器，支持根据不同url配置不同的拦截器。
  this.setInterceptors(instance, options.url);
  return instance(config); // 返回axios实例的执行结果
}
}

export default new NewAxios();
