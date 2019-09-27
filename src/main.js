import Typer from './components/Typer.vue';
import Stats from './components/Stats.vue';
import Keyboards from './components/Keyboards.vue';
import App from './App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
require('@/assets/main.css');
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Typer },
    { path: '/stats', component: Stats },
    { path: '/keyboards', component: Keyboards }
  ]
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
}).$mount('#app');
