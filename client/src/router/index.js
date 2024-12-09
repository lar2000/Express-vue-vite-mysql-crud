import { createRouter, createWebHistory } from 'vue-router';
import City from '../components/City.vue';
import Users from '../components/Users.vue';
import ItemList from '../components/ItemList.vue';

const routes = [
  {
    name: 'City',
    path: '/city',
    component: City,
  },
  {
    name: 'Users',
    path: '/users',
    component: Users,
  },
  {
    name: 'ItemList',
    path: '/item-list',
    component: ItemList,
  },

];

const router = createRouter({
  history: createWebHistory(), // Use Web History for browser navigation
  routes,
});

export default router;
