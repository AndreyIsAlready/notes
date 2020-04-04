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
            <div class="invisible">
                <label>
                    <input type="text">
                </label>
                <button>соранить</button>
                <button @click="cancel">отменить</button>
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
                console.log(event.target.style);
                event.target.style = 'display: none';
                document.querySelector('.invisible').style = 'display: block';
            },
            cancel () {
                document.querySelector('.invisible').style = 'display: none';
                document.querySelector('.addTodo').style = 'display: true';
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