<template>
    <div class="vNote">
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
        </div>
        <button class="addTodo" @click="newTodo">Добавить заметку</button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "v-note",

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
            completed (event) {
                let checbox = event.target;
                if (checbox.checked) {
                    event.target.parentNode.childNodes[0].classList.add('completed')
                } else {
                    event.target.parentNode.childNodes[0].classList.remove('completed')
                }
            },
            newTodo (event) {
                event.target.disabled = true;
                let container = document.querySelector('.container');
                let newTodo = document.createElement('input');
                container.appendChild(newTodo);
            }
        }
    }
</script>

<style scoped>
    .vNote{
        border: 3px solid gray;
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
</style>