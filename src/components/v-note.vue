<template>
    <div class="vNote" v-if="NOTE.id">
        <b><p>{{NOTE.title}}</p></b>
        <div class="container">
            <div
                    class="note"
                    v-for="todo in NOTE.todo"
                    :key="todo"
                >
                <label>
                    <span>{{todo}}</span>
                    <input @click="completed" type="checkbox">
                </label>
                <button>редактировать</button>
            </div>
            <div class="invisible">
                <label>
                    <input id="textTodo" type="text" @keydown.enter="createNewTodo(NOTE.id)">
                </label>
                <button @click="createNewTodo(NOTE.id)">соранить</button>
                <button @click="cancel">отменить</button>
            </div>
        </div>
        <button class="addTodo" @click="newTodo">Добавить запись</button>
    </div>
    <vNewNote v-else/>
</template>

<script>

    import vNewNote from './v-new-note'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "v-note",

        components: {
            vNewNote
        },

        props: {},

        data() {
            return {};
        },

        computed: {
            ...mapGetters([
                'NOTE'
            ])
        },

        methods: {
            ...mapActions([
                'CREATE_NEW_TODO'
            ]),
            completed (event) {
                let checkbox = event.target;
                if (checkbox.checked) {
                    event.target.parentNode.childNodes[0].classList.add('completed');
                    return
                }

                event.target.parentNode.childNodes[0].classList.remove('completed')
            },
            newTodo (event) {
                event.target.style = 'display: none';
                document.querySelector('.invisible').style = 'display: block';
            },
            cancel () {
                document.querySelector('.invisible').style = 'display: none';
                document.querySelector('.addTodo').style = 'display: true';
            },
            createNewTodo (id) {
                let textTodo = document.querySelector('#textTodo');

                if (textTodo.value) {
                    this.CREATE_NEW_TODO({id: id, text: textTodo.value})
                }

                textTodo.placeholder = 'Введите текст';
                document.querySelector('.invisible').style = 'display: none';
                document.querySelector('.addTodo').style = 'display: true';
            }
        },
    }
</script>

<style scoped>
    .vNote{
        border: 3px solid gray;
    }
    .container{
        display: grid;
        grid-row-gap: 10px;
    }
    .completed{
        text-decoration: line-through;
    }
    .addTodo{
        margin: 20px;
        background: green;
        border: 2px solid green;
        width: 300px;
        height: 30px;
        border-radius: 5px;
    }
    .addTodo:active{
        width: 290px;
        height: 28px;
    }
    .invisible{
        display: none;
        margin: 10px;
    }
</style>