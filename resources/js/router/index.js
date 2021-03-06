import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/Dashboard'
import Profile from '../components/Profile'
import Index from '../components/app1/Index'
import Users from '../components/Users'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { 
            path: '/dashboard', 
            component: Dashboard,
        },
        { 
            path: '/profile', 
            component: Profile
        },
        { 
            path: '/', 
            component: Index
        },
        { 
            path: '/users', 
            component: Users
        },
    ]
})