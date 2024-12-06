import { createRouter, createWebHistory } from 'vue-router';
import Address from '../components/Address.vue';
import Users from '../components/Users.vue';
import ItemList from '../components/ItemList.vue';
import Add_user from '../components/Add_user.vue';

const routes = [
  {
    name: 'Address',
    path: '/address',
    component: Address,
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
  {
    name: 'Add_users',
    path: '/add_user',
    component: Add_user,
  },
];

const router = createRouter({
  history: createWebHistory(), // Use Web History for browser navigation
  routes,
});

export default router;
