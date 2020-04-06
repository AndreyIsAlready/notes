<template>
    <div class="v-items">
        <b><p class="title">{{note_data.title}}</p></b>
        <div
                v-for="(todo, index) in note_data.todo"
                :key="index"
        >
            <div v-if="index < 3">
                <div v-if="todo[1]">
                    <span class="text line-through">-{{todo[0]}}</span>
                    <label>
                        <input disabled type="checkbox" checked>
                    </label>
                </div>
                <div v-else>
                    <span class="text">-{{todo[0]}}</span>
                    <label>
                        <input disabled type="checkbox">
                    </label>
                </div>
            </div>
        </div>

        <router-link class="link" :to="{name: 'note'}">
            <button class="btn edit" @click="pageNote(note_data.id)">Редактировать</button>
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
                'FIND_NOTE'
            ]),

            pageNote(id) {
                this.FIND_NOTE(id);
            },

            remove(id) {
                this.FIND_NOTE(id);
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
    .line-through{
        text-decoration: line-through;
    }
</style>