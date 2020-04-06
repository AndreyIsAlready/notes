<template>
    <div class="vNote" v-if="NOTE.id">
        <div class="big-container">
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
        <router-link :to="{name: 'notes'}">
            <button class="buttonSave" @click="save">сохранить</button>
        </router-link>
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
                'FIND_NOTE',
                'EDIT_NOTE'
            ]),
            completed (event, index) {
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
            save () {
                let todo = this.NOTE.todo;
                let i = 0;
                let checkboxs = document.querySelectorAll('.checkbox');
                for (let checkbox of checkboxs) {
                    todo[i][1] = checkbox.checked;
                    i++
                }

                let note = {
                    id: this.NOTE.id,
                    title: this.NOTE.title,
                    todo: todo
                };
                let json = JSON.stringify(note);
                localStorage.removeItem(String(note.id));
                localStorage.setItem(String(note.id), json);
                this.EDIT_NOTE({id: note.id, todo:note.todo});
                location.href = '/'
            },
            edit (index) {
                index;
               // console.log(index)
            }
        },
        mounted() {
                let checkboxs = document.querySelectorAll('.checkbox');
                let i = 0;

                for (let checkBox of checkboxs) {
                    if (this.NOTE.todo[i][1]) {
                        checkBox.parentNode.childNodes[0].classList.add('completed');
                    }
                    i++;
                }
        },
    }
</script>

<style scoped>
    .big-container{
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
    .buttonSave{
        margin: 1%;
        background: #298060;
        border: 2px solid #298060;
        width: 400px;
        height: 35px;
        border-radius: 5px;
        color: white;
        font-size: 25px;
    }
    .buttonSave:active{
        background: black;
        border: 2px solid black;
    }
</style>