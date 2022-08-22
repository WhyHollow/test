import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '*',
    name: '404',
    component: HomeView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
  },
  {
    path: '/spaces',
    name: 'spaces',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Spaces.vue'),
  },
  {
    path: '/spaces/:spaceId',
    name: 'space',
    component: () => import(/* webpackChunkName: "about" */ '../views/Space.vue'),
  },
  {
    path: '/spaces/:spaceId/settings',
    name: 'spaceSettings',
    component: () => import(/* webpackChunkName: "about" */ '../views/SpaceSettings.vue'),
  },
  {
    path: '/spaces/:spaceId/members',
    name: 'spaceMembers',
    component: () => import(/* webpackChunkName: "about" */ '../views/SpaceMembers.vue'),
  },
  {
    path: "/transcriptions/:transcriptionId'",
    name: 'transcriptions',
    component: () => import(/* webpackChunkName: "about" */ '../views/Transcriptions.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import(/* webpackChunkName: "about" */ '../views/Upload.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
