import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 安装 饿了么ui
Vue.use(ElementUI);
import directives from './plugins/directives.js';
import filters from './plugins/filters.js';
Vue.use(directives)
Vue.use(filters)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
