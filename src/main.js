import App from './App.vue'
import router  from "./router";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import  store from './store/index'
import toast from './components/toast/index'
Vue.prototype.$bus=new Vue()
Vue.use(toast)
Vue.use(mavonEditor)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
