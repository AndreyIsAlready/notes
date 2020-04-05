import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {

        note:{},

        notes: []
    },

    mutations: {
        GET_ALL_NOTES: (state) => {
            for (let key of Object.keys(localStorage)) {
                if (!isNaN(key)) {
                    state.notes.push(JSON.parse(localStorage.getItem(key)))
                }
            }
            console.log(state.notes)
        },
        FIND_NOTE: (state, id) => {
            for (let note of state.notes) {
                if (note.id === id) {
                    state.note = note;
                }
            }
        },
        DELETE_NOTE: (state) => {
            let i = 0;
            for (let note of state.notes) {
                if (note.id === state.note.id) {
                    console.log(state.notes.length);
                    state.notes.splice(i, 1);
                    console.log(state.notes.length);
                }
                i++;
            }
        },
        CREATE_NEW_TODO: (state, params) => {
            for (let note of state.notes) {
                if (note.id === params.id) {
                    note.todo.push(params.text);
                }
            }
        },
        NEW_NOTE: (state) => {
            state.note = {};
        },
        ADD_NEW_NOTE: (state, newNote) => {
            state.notes.push(newNote);
            state.note = newNote;
        }
    },

    actions: {
        GET_ALL_NOTES({commit}) {
            commit('GET_ALL_NOTES');
        },
        NOTE({commit}, id) {
            commit('FIND_NOTE', id);
        },
        DELETE_NOTE({commit}) {
            commit('DELETE_NOTE');
        },
        CREATE_NEW_TODO({commit}, params) {
            commit('CREATE_NEW_TODO', params);
        },
        NEW_NOTE({commit}) {
            commit('NEW_NOTE');
        },
        ADD_NEW_NOTE({commit}, newNote) {
            commit('ADD_NEW_NOTE', newNote);
        }
    },
    getters: {
        NOTES(state) {
            return state.notes;
        },
        NOTE(state) {
            return state.note;
        },
        /**
         * @return {number}
         */
        LAST_ID(state) {
            let id = 0;
            for (let note of state.notes) {
                if (id < note.id) {
                    id = note.id
                }
            }
            return id;
        }
    }
});

export default store;