import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import { store } from './store'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

Vue.config.productionTip = false
Vue.component('Vselect', vSelect)

//アプリケーションを立ち上げる際に、localStorageにあるトークンを受け取る
const token = localStorage.getItem('accessToken')

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //トークンをデコード
    const user = jwt_decode(token)
    console.log(user);
    store.dispatch('user/setUser', user)
}

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')