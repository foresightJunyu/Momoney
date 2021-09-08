import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";

Vue.use(VueRouter)

// const routes: Array<RouteConfig> = [
//     {
//         path: '/',
//         name: 'Home',
//         component: Home
//     },
//     {
//         path: '/about',
//         name: 'About',
//         // route level code-splitting
//         // this generates a separate chunk (about.[hash].js) for this route
//         // which is lazy-loaded when the route is visited.
//         component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//     }
// ]

/* 在这里添加路由，做页面的下标菜单栏 */
const routes = [
  {
    path: '/',
    redirect: '/money' //默认路径，重定向到money
  },
  {
    path: '/money',// 注意：一般路径都是小写的，组件都是大写的
    component : Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path:'/statistics',
    component: Statistics
  }
]

const router = new VueRouter({
    routes
})

export default router
