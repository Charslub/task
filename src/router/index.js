//        去年今日此门中，人面桃花相映红。
//        人面不知何处去，桃花依旧笑春风。
import store from "../store";
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../view/Home/Home')
  },
  {
    path: '/edit',
    component: () => import('../view/Edit/EditPage')
  },
  {
    path: '/docs',
    component: () => import('../view/Docs/Docs')
  }
]
const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // ...
  let token=localStorage.getItem('token')
  let username=localStorage.getItem('username')
  if (!token) {//如果token不存在
    Vue.prototype.$toast.Message({
      type:'error',
      message:'未登录或登录过期，请登录!'
    })
  }else{//如果token存在
    store.dispatch('changeUsername',username)
    //这里可以重新请求一下数据
  }

  next()
})
export default router