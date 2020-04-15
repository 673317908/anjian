import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/page/login'
import detail from '@/page/detail'
import number from '@/page/number'
import startTest from '@/page/startTest'
import studentQiandao from '@/page/studentQiandao'
import regover from '@/page/regover'
Vue.use(Router)

function getAbsolutePath () {
  let path = location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
}

const router= new Router({
  hash:'history',
  base:getAbsolutePath(),
  routes: [
    // {
    //   path: '/',
    //   name: 'default',
    //   redirect:{
    //     name:'Index'
    //   }
    // },
    {
      path:'/',
      name:'login',
      component:login
    },
    {
      path:'/detail',
      name:'detail',
      component:detail
    },
    {
      path:'/number',
      name:'number',
      component:number
    },
    {
      path:'/startTest',
      name:'startTest',
      component:startTest
    },
    {
      path:'/studentQiandao',
      name:'studentQiandao',
      component:studentQiandao
    },
    {
      path:'/regover',
      name:'regover',
      component:regover
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.path.indexOf('/detail')===0){
//     let token=sessionStorage.getItem('token')
//     if(token){
//       next()
//     }else {
//       next({name:'login'})
//     }
//   }
// })

export default router