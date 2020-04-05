<template>
    <div class="v-items" @click="pageNote(note_data.id)">
        <b><p class="title">{{note_data.title}}</p></b>
        <div
                v-for="(todo, index) in note_data.todo"
                :key="index"
        >
            <span class="text" v-if="index < 3">-{{todo}}</span>
            <label v-if="index < 3">
                <input disabled type="checkbox">
            </label>
        </div>

        <router-link class="link" :to="{name: 'note'}">
            <button class="btn edit">Редактировать</button>
        </router-link>

        <button class="btn remove" @click="remove(note_data.id)">Удалить</button>
    </div>
</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: "v-items",
        components: {
        },
        props: {
           note_data: {
               type: Object,
               default() {
                   return {};
               }
           }
        },
        methods: {

            ...mapActions([
                'NOTE'
            ]),

            pageNote(id) {
                this.NOTE(id)
            },

            remove(id) {
                this.NOTE(id);
                document.querySelector('.v-ask-window').style = 'display: grid'
            }
        }
    }

</script>

<style scoped>
    .link{
        text-decoration: none;
    }
    .remove
    {
        background: #ff854f;
        border: 1px solid red;
    }
    .edit
    {
        background: #2d6c80;
        border: 1px solid blue;
    }
    .btn{
        display: block;
        margin: 5px;
        width: 120px;
        cursor: pointer;
    }
    .v-items{
        border: 4px solid gray;
        margin: 5px;
    }

    .text{
        color: gray;
    }
</style>