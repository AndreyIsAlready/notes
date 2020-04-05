<template>
    <div class="v-new-note">
        <h2 class="heading">Создайте новую заметку</h2>
        <div class="container">
            <div class="titleNote">
                <h2 class="heading">Название заметки</h2>
                <label>
                    <input type="text" class="text" @keydown.enter="addTitle">
                </label>
            </div>
            <h2 class="heading">todo</h2>
            <div class="todos"></div>
            <label>
                <input class="todo" @keydown.enter="addTodo" type="text">
                <button @click="addTodo">добавить</button>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-new-note",
        methods:{
            addTodo() {
                let input = document.querySelector('.todo');

                if (!input.value.length) {
                    input.placeholder = 'Введите текст';
                    return
                }

                let div = document.querySelector('.todos');
                let p = document.createElement('p');

                p.innerHTML = '-' + document.querySelector('.todo').value;
                div.appendChild(p);
            },
            addTitle() {
                let text = document.querySelector('.text');
                if (!text.value.length) {
                    text.placeholder = 'Введите текст';
                    return
                }
                text.style = 'display: none';

                let h3 = document.createElement('h3');

                h3.innerHTML = text.value;

                let title = document.querySelector('.titleNote');

                title.appendChild(h3);

            }
        },
        mounted() {
            console.log('hello');
        }
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
</style>