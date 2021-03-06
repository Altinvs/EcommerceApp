import Vue from 'vue'
import VueRouter from 'vue-router'
import AddPost from '../views/AddPost'
import Post from '../views/Post.vue';
import Dashboard from '../views/Dashboard.vue';
import EditPost from '../views/EditPost.vue';
import Home from '../views/Home'
import store from '../Store/store'
import Checkout from '../views/Checkout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post,
  },
  {
    path: '/edit-post/:id',
    name: 'edit-post',
    component: EditPost,
  },
  {
    path: '/add-post',
    name: 'add-post',
    component: AddPost,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      //Redirect to the Login Page
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      //Redirect to the Login Page
      next('/profile');
    } else {
      next();
    }
  } else {
    next()
  }
})

export default router
