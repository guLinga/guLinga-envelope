import VueRouter from 'vue-router'
// const LoginSign = r => require.ensure([], () => r(require('../pages/LoginSign.vue')), 'LoginSign')
const Login = r => require.ensure([], () => r(require('../components/LoginSign/Login.vue')), 'LoginSign')
const Sign = r => require.ensure([], () => r(require('../components/LoginSign/Sign.vue')), 'LoginSign')
import LoginSign from '../pages/LoginSign.vue'
const router = new VueRouter({
    linkActiveClass: 'is-active',
    routes: [
        {
            path: '/LoginSign',
            name: 'LoginSign',
            component: LoginSign,
            children: [
                {
                    path: '/',
                    redirect: 'Login'
                },
                {
                    path: 'Login',
                    name: 'Login',
                    component: Login,
                },
                {
                    path: 'Sign',
                    name: 'Sign',
                    component: Sign,
                }
            ]
        }
    ]
})
export default router