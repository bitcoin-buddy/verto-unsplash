import { createWebHashHistory,createRouter, createWebHistory } from "vue-router";
import rt from './components/rt.vue'
import library from './components/library.vue'
import media from './components/media.vue'

const routes = [

    {
        path : '/',
        name : 'App',
        component : rt
    },

    {
        path : '/library',
        name : 'LibraryView',
        component : library
    },
    
    {
        path : '/media/:url',
        name : 'MediaView',
        component : media
    },


];

const router = createRouter({
history : createWebHistory(),
routes
})


export default router;