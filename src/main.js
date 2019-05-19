import Vue from 'vue';
import 'animate.css';
import 'fullpage-vue/src/fullpage.css';
import VueFullpage from 'fullpage-vue';
import VueMoment from 'vue-moment';
import { Laue } from 'laue';

import App from './App.vue';
// import router from './router';
import store from './store';


Vue.use(VueFullpage);
Vue.use(VueMoment);
Vue.use(Laue);

Vue.config.productionTip = false;

new Vue({
  // router,
  store,
  render: h => h(App),
}).$mount('#app');
