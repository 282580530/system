import Vue from 'vue'
import store from './store' // 引入store文件
import Router from 'vue-router'
import Login from './views/login'
import Layout from './views/index'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login
    },


    {
      path: '/404',
      component: () => import('./views/404'),
    },
    {
      path: '/index',  //首頁
      component: Layout,
      children: [
        {
          path: 'report',
          component: () => import('./views/report'),
          name:'report'
        },
        {
          path: 'knowledge',
          component: () => import('./views/knowledge'),
          name:'knowledge'
        },
        {
          path: 'knowledgeList',
          component: () => import('./views/knowledgeList'),
          name:'knowledgeList'
        },
      ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404' }
  ]
})
// 导航守卫限制路由跳转
router.beforeEach((to, from, next) => {
  let login = store.state.userHasLogin; //登陸
  console.log(login, 'login');
  if (to.path === '/login') {
    next()
  }
  if (login) {
    next()
  } else {
    next('/login')
  }
})
// router  要跟你引用的路由名称一致
export default router