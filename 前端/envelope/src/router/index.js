import VueRouter from 'vue-router'
const Login = r => require.ensure([], () => r(require('../components/LoginSign/Login.vue')), 'Login')
const Sign = r => require.ensure([], () => r(require('../components/LoginSign/Sign.vue')), 'Sign')
const HomePage = r => require.ensure([], () => r(require('../pages/HomePage.vue')), 'HomePage')
const LoginSign = r => require.ensure([], () => r(require('../pages/LoginSign.vue')), 'LoginSign')
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
        },
        {
            path:'/Guling',
            name:'Guling',
            component:HomePage
        }
    ]
})
export default router