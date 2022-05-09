import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login/Login'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
    if (localStorage.getItem("token") === null && to.name !== 'Login') {
        next({path: '/login', props: { errorMessage: 'Veuillez vous connecter avant d\'accéder à cette page' } });
    }

    next();
})
  

export default router