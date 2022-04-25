import Vue from 'vue'
import App from './App.vue'
// Vue.config.productionTip = false
// 引入路由
import VueRouter from 'vue-router'
// 引入路由文件
import router from './router/index'
Vue.use(VueRouter)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
