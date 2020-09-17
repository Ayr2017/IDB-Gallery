import Vue from 'vue';
import Vuex from 'vuex';
import indexedDB from '@/store/modules/indexedDB';
import remoteimages from '@/store/modules/remoteimages';
import general from '@/store/modules/general';
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        indexedDB,
        remoteimages,
        general
    }
});
