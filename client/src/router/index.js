import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Home from '../views/Home.vue'
import AddPost from '../views/AddPost.vue'
import Post from '../views/Post.vue'
import EditPost from '../views/EditPost.vue'
import axios from 'axios'
const userUrl = '/api/user'

import { store } from '../store'

Vue.use(VueRouter)

const routes = [{
        path: '/signup',
        name: 'signup',
        component: SignUp
    },
    {
        path: '/login',
        name: 'login',
        component: LogIn
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/add-pokemon',
        name: 'add-pokemon',
        component: AddPost,
        meta: { requiresAuth: true }
    },
    {
        path: '/post/:id',
        name: 'post',
        component: Post,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit-post/:id',
        name: 'edit-post',
        component: EditPost,
        meta: { requiresAuth: true }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async(to, from, next) => {
    if (to.meta.requiresAuth) {
        console.log(store.state.user.user);
        const storeUser = store.state.user
        const token = localStorage.getItem('accessToken')

        if (token) {
            // console.log("ここまで来てるよ");
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                // console.log("ここまで来てるよ");
            let res = await axios.get(userUrl)
                .catch(err => {
                    console.log(err);
                    axios.defaults.headers.common['Authorization'] = null
                    next('login')
                })
                // console.log(res ? "resあるよ" : "res空だよ");
                // console.log("ここまで来てるよ");
            console.log(res);
            if (!storeUser.user) {
                router.push('login')
            } else {
                next()
            }
        } else {
            console.log("tokenないよ");
        }
    } else {
        console.log(to.meta.requiresAuth);
        next()
    }
})

export default router