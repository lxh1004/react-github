import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Composition from '../views/home/composition/'
import Flows from '../views/home/flows/'
import User from '../views/home/user/'
import Source from '../views/home/source/'

const routes = [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/home/composition',
                component: Composition
            },
            {
                path: '/home/flows',
                component: Flows,
                auth: true
            },
            {
                path: '/home/user',
                component: User,
                auth: true
            },
            {
                path: '/home/source',
                component: Source,
                auth: true
            },
            {
                path: '/home',
                redirect: '/home/composition',
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        redirect: '/home'
    }
]

export default routes