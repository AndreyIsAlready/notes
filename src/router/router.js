import Vue from 'vue'
import Router from 'vue-router'

import vNotes from '../components/v-notes'
import vNote from '../components/v-note'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'notes',
            component: vNotes
        },

        {
            path: '/note',
            name: 'note',
            component: vNote,
            props: true
        }
    ]
});

export default router;