<template>
    <div class="v-new-note">
        <p>Создайте новую заметку</p>
        <div class="container">
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

                p.innerHTML = document.querySelector('.todo').value;
                div.appendChild(p);
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
</style>