import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/discovery'
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: () => import('../views/discovery/IndexView.vue')
    },
    {
      path: '/playlists',
      name: 'playlists',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PlayList.vue')
    },
    {
      path: '/songs',
      name: 'songs',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SongsView.vue')
    },
    {
      path: '/mvs',
      name: 'mvs',
      component: () => import('../views/MVsView.vue')
    },
    {
      path: '/mv/:id',
      name: 'mv',
      component: () => import('../views/MvView.vue'),
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: () => import('../views/PlayListdetail.vue'),
    },
    {
      path: '/search/:keywords',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      children:[
        {
          path: '',
          redirect: '/songs'
        },
        {
          path:'songs',
          name:'searchSongs',
          component: () => import('../components/SearchSongs.vue'),
        },
        {
          path:'playlists',
          name:'searchPlaylists',
          component: () => import('../components/SearchList.vue'),
        },
        {
          path:'mvs',
          name:'searchMvs',
          component: () => import('../components/SearchMV.vue'),
        }
      ]
    },    
  ]
})

export default router
