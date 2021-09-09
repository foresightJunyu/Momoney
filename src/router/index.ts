import Vue from 'vue'
import VueRouter, {RouteConfig} from "vue-router";
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter)


/* 在这里添加路由，做页面的下标菜单栏 */
const routes = [
    {
        path: '/',
        redirect: '/money' //默认路径，重定向到money
    },
    {
        path: '/money',// 注意：一般路径都是小写的，组件都是大写的
        component: Money
    },
    {
        path: '/labels',
        component: Labels
    },
    {
        path: '/statistics',
        component: Statistics
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
   routes
})

export default router
