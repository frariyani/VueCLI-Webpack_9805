import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path){
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: importComponent('DashboardLayout'),
            meta: {Auth:true},
            children: [
                //dashboard
                {   
                    path: "/dashboard",
                    name: "Dashboard",
                    meta: {title: 'Dashboard'},
                    component: importComponent('Dashboard'),
                },
                //products
                {
                    path: "/products",
                    name: "Products",
                    meta: {title: 'Products'},
                    component: importComponent('DataMaster/Products'),
                },
                //profile
                {
                    path: "/profile",
                    name: "Profile",
                    meta: {title: 'Profile'},
                    component: importComponent('DataMaster/Profile'),
                }
            ]
        },
        //login
        {
            path: "/login",
            name: "login",
            meta: {title: 'Login'},
            component: importComponent('Login'),
        },
        {
            path: '*',
            redirect: '/'
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.Auth)) {
        if (localStorage.getItem('token')) {
            next();
        }
        else {
            router.replace('/login')
        }
    } else {
        next()
    }
});

export default router;