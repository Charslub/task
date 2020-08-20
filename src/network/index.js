import router from "../router";
export function request(config) {

  const instance = axios.create({
    baseURL: 'http://47.94.84.23:8081/'
  })

  //请求
  instance.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if (token) {//是否存在token
      config.headers.Authorization = token
    }else{
      //回到首页
      router.push('/home')
    }
    return config//这里返回出去  不然拦截下来了你不放 后面的就没了
  }, err => {
    return err
  })
  //拦截响应
  instance.interceptors.response.use(config => {
    return config.data///这里返回出去  不然拦截下来了你不放 后面的就没了
  }, err => {
    console.log(err)
    return err
  });


  return instance(config)
}