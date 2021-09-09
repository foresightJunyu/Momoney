import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";

Vue.config.productionTip = false

Vue.component('Nav',Nav)
/*精髓之处，如果用之前的第一种方法，在App.vue里写的话，那么哪哪都有，不想要的话就很烦
* 然后第二种方法在组件下添加Nav.vue的话，可以做到想要的组件里import此Nav.vue
* 第三种，以上的这个方法就能全局使用，在哪想用就能用了
* 面试的时候可以吹，在项目中遇到了这这问题，然后怎么一步步解决的，发现还是全局引入最方便*/

Vue.component('Layout',Layout)
Vue.component('Icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

