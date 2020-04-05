<template>
    <div class="vNote" v-if="NOTE.id">
        <b><p>{{NOTE.title}}</p></b>
        <div class="container">
            <div
                    class="note"
                    v-for="(todo, index) in NOTE.todo"
                    :key="index"
                >
                <label v-if="todo[1]">
                    <span>{{todo[0]}}</span>
                    <input class="checkbox" @click="completed($event, index)" type="checkbox" checked>
                </label>
                <label v-else>
                    <span>{{todo[0]}}</span>
                    <input class="checkbox" @click="completed($event, index)" type="checkbox">
                </label>

                <button @click="edit(index)">редактировать</button>
            </div>
            <div class="invisible">
                <label>
                    <input id="textTodo" type="text" @keydown.enter="createNewTodo(NOTE.id)">
                </label>
                <button @click="createNewTodo(NOTE.id)">соранить</button>
                <button @click="cancel">отменить</button>
            </div>
        </div>
        <button class="addTodo" @click="newTodo">Добавить todo</button>
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
                'CREATE_NEW_TODO',
                'TODO_IS_DONE',
                'FIND_NOTE'
            ]),
            completed (event, index) {
                console.log(index);
                let checkbox = event.target;

                let idsAndCheck = {
                    id: index,
                    isCheck:checkbox.checked
                };

                this.TODO_IS_DONE(idsAndCheck);

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
                    this.CREATE_NEW_TODO({id: id, text: [textTodo.value, false]})
                }

                textTodo.placeholder = 'Введите текст';
                document.querySelector('.invisible').style = 'display: none';
                document.querySelector('.addTodo').style = 'display: true';
            },
            edit (index) {
                console.log(index)
            }
        },
        mounted() {
            let checkboxs = document.querySelectorAll('.checkbox');

            for (let checkBox of checkboxs) {
                if (checkBox.checked) {
                    console.log(checkBox.parentNode.childNodes[0]);
                    checkBox.parentNode.childNodes[0].classList.add('completed');
                }
            }
        }
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