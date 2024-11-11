import { createRouter, createWebHistory } from 'vue-router';
import PostList from '@/views/PostList.vue';  // Main page showing all posts
import PostDetail from '@/views/PostDetail.vue';  // Page for a single post
import type { RouteRecordRaw } from 'vue-router';

// Define your routes
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'PostList',
        component: PostList,
    },
    {
        path: '/post/:id',
        name: 'PostDetail',
        component: PostDetail,
        props: true,  // Enables route params to be passed as props to the component
    },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;