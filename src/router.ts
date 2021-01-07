import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Pool from '@/views/Pool.vue';
import Settings from '@/views/Settings.vue';
import Vault from '@/views/Vault.vue';
import Create from '@/views/Create.vue';
import Claim from '@/views/Claim.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', name: 'home', component: Home },
  { path: '/pool/:id', name: 'pool', component: Pool },
  { path: '/settings', name: 'settings', component: Settings },
  { path: '/vault', name: 'vault', component: Vault },
  { path: '/create', name: 'create', component: Create },
  { path: '/claim/:address', name: 'claim', component: Claim },
  { path: '/*', name: 'error-404', beforeEnter: (to, from, next) => next('/') }
];

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;