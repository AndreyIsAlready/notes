import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {

        note:{},

        notes: [
            {
                id:1,
                title: 'Бизнес план',
                todo:[
                    'пернуть',
                    'Начать на этом зарабатывать',
                    'жопа',
                    'хуй'
                ]
            },
            {
                id:2,
                title: 'Получение денег',
                todo:[
                    'пернуть',
                    'Начать продвигать это в массы',
                    'кайфовать',
                    'еще че нибудь'
                ]
            },
            {
                id:3,
                title: 'Допилить',
                todo:[
                    'собраться',
                    'порабоать',
                    'кайфовать',
                ]
            },
            {
                id:4,
                title: 'Допилить',
                todo:[
                    'собраться',
                    'порабоать',
                    'кайфовать',
                ]
            }
        ]
    },

    mutations: {
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
    },

    actions: {
        NOTE({commit}, id) {
            commit('FIND_NOTE', id)
        },
        DELETE_NOTE({commit}) {
            commit('DELETE_NOTE')
        }
    },
    getters: {
        NOTES(state) {
            return state.notes
        },
        NOTE(state) {
            return state.note
        }
    }
});

export default store;