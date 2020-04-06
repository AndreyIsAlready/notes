<template>
    <div class="vNote" v-if="NOTE.id">
        <vAskWindow class="v-ask-window"></vAskWindow>
        <div class="big-container">
            <b><p>{{NOTE.title}}</p></b>
            <div class="container">
                <div
                        class="note"
                        v-for="(todo, index) in NOTE.todo"
                        :key="index"
                    >
                    <label v-if="todo[1]">
                        <span class="CancelEditSpan">{{todo[0]}}</span>
                        <input class="checkbox CancelEditCheckbox" @click="completed($event, index)" type="checkbox" checked>
                    </label>
                    <label v-if="!todo[1]">
                        <span class="CancelEditSpan">{{todo[0]}}</span>
                        <input class="checkbox CancelEditCheckbox" @click="completed($event, index)" type="checkbox">
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
            <button class="buttonSave" @click="save">сохранить</button>
            <button class="buttonSave" @click="removeEditNote">отменить редактирование</button>
            <button class="buttonSave" @click="getEditNote">вернуть изменения</button>
            <button class="buttonSave" @click="remove(NOTE.id)" >удалить</button>
    </div>
    <vNewNote v-else/>
</template>

<script>

    import vNewNote from './v-new-note'
    import vAskWindow from './v-ask-window'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "v-note",

        components: {
            vNewNote,
            vAskWindow
        },

        props: {},

        data() {
            return {
                note: this.NOTE
            };
        },

        computed: {
            ...mapGetters([
                'NOTE'
            ])
        },

        methods: {
            ...mapActions([
                'CREATE_NEW_TODO',
                'FIND_NOTE',
                'TODO_IS_DONE',
                'EDIT_NOTE',
                'REMOVE_EDIT_NOTE'
            ]),
            completed (event, index) {
                let checkbox = event.target;

                let idAndCheck = {
                    id: index,
                    isCheck: checkbox.checked
                };

                this.TODO_IS_DONE(idAndCheck);

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
                localStorage.setItem('note', json);
                this.EDIT_NOTE({id: note.id, todo:note.todo});
            },
            removeEditNote () {
                this.REMOVE_EDIT_NOTE();
                let spanList = document.querySelectorAll('.CancelEditSpan');
                let checkboxList = document.querySelectorAll('.CancelEditCheckbox');
                let todo = [];

                for (let i = 0; i < spanList.length; i++) {
                    todo.push([spanList[i].innerHTML, checkboxList[i].checked]);

                    spanList[i].innerHTML = this.NOTE.todo[i][0];
                    checkboxList[i].checked = this.NOTE.todo[i][1];

                    if (checkboxList[i].checked) {
                        spanList[i].classList.add('completed');
                        continue
                    }
                    spanList[i].classList.remove('completed');
                }


                let oldNote = JSON.stringify({
                    title: this.NOTE.title,
                    todo: todo
                });

                localStorage.setItem('oldNote', oldNote);
            },
            remove(id) {
                this.FIND_NOTE(id);
                document.querySelector('.v-ask-window').style = 'display: grid';
            },
            getEditNote() {
                let spanList = document.querySelectorAll('.CancelEditSpan');
                let checkboxList = document.querySelectorAll('.CancelEditCheckbox');
                let note = JSON.parse(localStorage.getItem('oldNote'));

                for (let i = 0; i < spanList.length; i++) {
                    spanList[i].innerHTML = note.todo[i][0];
                    checkboxList[i].checked = note.todo[i][1];

                    if (checkboxList[i].checked) {
                        spanList[i].classList.add('completed');
                        continue
                    }
                    spanList[i].classList.remove('completed');
                }
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
    .v-ask-window{
        position: fixed;
        z-index: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
    }
</style>