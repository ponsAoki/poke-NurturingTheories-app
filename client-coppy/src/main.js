import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false
Vue.component('Vselect', vSelect)

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')