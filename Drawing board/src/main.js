// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Drawing from './components/Drawingboard'
import VueRouter from 'vue-router'

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router=new VueRouter({
    routes:[
      {path:"/",component:Drawing},
    ],
})

//全局注册组件
Vue.component("APP-Drawing",Drawing);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
