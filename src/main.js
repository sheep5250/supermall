import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import FastClick from 'fastclick'
import VuelazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(VuelazyLoad,{
  loading: require('./assets/img/common/placeholder.png'),
})
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
