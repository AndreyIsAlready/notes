<template>
    <div class="v-new-note">
        <h2 class="heading">Создайте новую заметку</h2>
        <div class="container">
            <div class="titleNote">
                <h2 class="heading">Название заметки</h2>

                <label class="titleForm">
                    <input type="text" class="text" v-model="text" @keydown.enter="addTitle">
                    <button @click="addTitle">добавить</button>
                </label>
                <div class="titleValue">
                    <h3 class="word" id="title">{{text}}</h3>
                    <button @click="editTitle">редактировать название заметки</button>
                </div>

            </div>
            <h2 class="heading">todo</h2>
            <div class="todos"></div>
            <label>
                <input class="todo" @keydown.enter="addTodo" type="text">
                <button @click="addTodo">добавить</button>
            </label>
        </div>
        <button class="buttonSave" @click="save">соранить</button>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "v-new-note",
        data() {
            return {
                text:'',
            }
        },
        computed: {
            ...mapGetters([
                'LAST_ID'
            ]),
        },
        methods:{
            ...mapActions([
               'ADD_NEW_NOTE'
            ]),
            addTodo() {
                let input = document.querySelector('.todo');

                if (!input.value.length) {
                    input.placeholder = 'Введите текст';
                    return
                }

                let div = document.querySelector('.todos');
                let p = document.createElement('p');
                p.classList.add('word');
                p.innerHTML = input.value;
                input.value = '';
                div.appendChild(p);
            },
            addTitle() {
                let text = document.querySelector('.text');
                
                if (!text.value.length) {
                    text.placeholder = 'Введите текст';
                    return
                }

                document.querySelector('.titleForm').style = 'display: none';
                document.querySelector('.titleValue').style = 'display: block';
            },
            editTitle() {
                document.querySelector('.titleForm').style = 'display: true';
                document.querySelector('.titleValue').style = 'display: none';
            },
            save() {
                let title = document.querySelector('#title').innerHTML;
                let todosTag = document.querySelector('.todos').querySelectorAll('p');
                let todo = [];

                for (let item of todosTag) {
                    todo.push([item.innerHTML, false]);
                }

                let newNote = {
                    id: (+this.LAST_ID + 1),
                    title: title,
                    todo: todo
                };
                let json = JSON.stringify(newNote);
                localStorage.setItem(String(newNote.id), json);
                this.ADD_NEW_NOTE(newNote);
            },
        },
    }
</script>

<style scoped>
    .todo{
        width: 300px;
    }
    .container{
        border: 3px solid gray;
        padding: 10px;
    }
    .titleNote{
        margin-bottom: 20px;
    }
    .heading{
        color: #63806e;
    }
    .titleValue{
        display: none;
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
    .word{
        white-space: normal;
    }
</style>