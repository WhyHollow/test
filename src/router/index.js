import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store';
import middlewarePipeline from './middlewarePipeline';

//Role
import guest from './middleware/guest';
import auth from './middleware/auth';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { middleware: [auth] },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
    meta: { middleware: [auth] },
  },
  {
    path: '/spaces',
    name: 'spaces',
    component: () => import(/* webpackChunkName: "about" */ '@/views/SpacesPage.vue'),
    meta: { middleware: [auth] },
  },
  {
    path: '/spaces/:spaceId',
    name: 'space',
    component: () => import(/* webpackChunkName: "about" */ '../views/SpacePage.vue'),
    meta: { middleware: [auth] },
  },
  {
    path: '/spaces/:spaceId/settings',
    name: 'spaceSettings',
    component: () => import(/* webpackChunkName: "about" */ '../views/SpaceSettings.vue'),
    meta: { middleware: [auth] },
  },
  {
    path: '/spaces/:spaceId/members',
    name: 'spaceMembers',
    component: () => import(/* webpackChunkName: "about" */ '../views/SpaceMembers.vue'),
    meta: { middleware: [auth] }
  },
  {
    path: "/transcriptions/:transcriptionId",
    name: 'transcriptions',
    component: () => import(/* webpackChunkName: "about" */ '../views/TranscriptionsPage.vue'),
    meta: { middleware: [auth] }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchPage.vue'),
    meta: { middleware: [auth] }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue'),
    meta: { middleware: [guest] },
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import(/* webpackChunkName: "about" */ '../views/UploadPage.vue'),
    meta: { middleware: [auth] }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilePage.vue'),
    meta: { middleware: [auth] }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})


router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router
