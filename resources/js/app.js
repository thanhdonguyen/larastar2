

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'
import moment from 'moment'
import router from './router'
import { Form, HasError, AlertError } from 'vform'

import Gate from './Gate'
Vue.prototype.$gate = new Gate(window.user)

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

import swal from 'sweetalert2'
window.swal = swal

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.toast = toast

window.Form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.filter('upText', function(text){
    return text.toUpperCase();
});

Vue.filter('myDate',function(created){
    return moment(created).startOf('hour').fromNow();
});

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue')
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue')
);

window.Fire = new Vue();

const app = new Vue({
    el: '#app',
    router
});

