import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {

        note: JSON.parse(localStorage.getItem('note')) ?? {},

        notes: []
    },

    mutations: {
        GET_ALL_NOTES: (state) => {
            let keys = [];
            for (let key of Object.keys(localStorage)) {
                if (!isNaN(key)) {
                    keys.push(key);
                }
            }

            keys.sort((a, b) => b-a);

            for (let key of keys) {
                state.notes.push(JSON.parse(localStorage.getItem(key)))
            }
        },
        FIND_NOTE: (state, id) => {
            for (let note of state.notes) {
                if (note.id === id) {
                    state.note = note;
                    localStorage.setItem('note', JSON.stringify(note))
                }
            }
        },
        DELETE_NOTE: (state) => {
            let i = 0;
            for (let note of state.notes) {
                if (note.id === state.note.id) {
                    state.notes.splice(i, 1);
                    localStorage.removeItem(note.id);
                }
                i++;
            }
        },
        CREATE_NEW_TODO: (state, params) => {
            for (let note of state.notes) {
                if (note.id === params.id) {
                    note.todo.push(params.text);
                    localStorage.removeItem(String(note.id));
                    localStorage.setItem(note.id, JSON.stringify(note));
                }
            }
        },
        NEW_NOTE: (state) => {
            state.note = {};
            localStorage.removeItem('note');
        },
        ADD_NEW_NOTE: (state, newNote) => {
            state.notes.push(newNote);
            state.note = newNote;
        },
        TODO_IS_DONE: (state, idAndCheck) => {
            for (let [todo, index] of state.note.todo) {
                if (index === idAndCheck.id) {
                    todo[1] = idAndCheck.isCheck;
                    localStorage.removeItem(String(state.note.id));
                    localStorage.setItem(state.note.id, JSON.stringify(state.note));
                }
            }
        }
    },

    actions: {
        GET_ALL_NOTES({commit}) {
            commit('GET_ALL_NOTES');
        },
        FIND_NOTE({commit}, id) {
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
        },
        TODO_IS_DONE({commit}, index) {
            commit('TODO_IS_DONE', index);
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