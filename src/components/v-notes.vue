<template>
    <div class="v-notes">
        <vAskWindow class="v-ask-window"></vAskWindow>
        <router-link class="link" :to="{name: 'note'}">
            <button class ="btn" @click="newNote">{{newNotes}}</button>
        </router-link>
        <div class="container">
            <vItems
                    v-for="note in NOTES"
                    :key="note.id"
                    :note_data="note"
            />
        </div>
    </div>
</template>

<script>

    import vItems from './v-items'
    import vAskWindow from './v-ask-window'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "v-notes",
        components: {
            vItems,
            vAskWindow
        },
        props: {},
        data() {
            return {
                newNotes: 'Новая заметка',
            }
        },
        computed: {
           ...mapGetters([
               'NOTES'
           ])
        },
        methods: {
            ...mapActions([
                'NEW_NOTE'
            ]),
            newNote() {
                this.NEW_NOTE();
            }
        }
    }
</script>

<style scoped>
    .v-ask-window{
        position: fixed;
        z-index: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
    }
    .container{
        display: grid;
        grid-template-columns:1fr;
    }
    .btn{
        margin: 10px;
        width: 300px;
        background: blue;
        border: blue;
        color: white;
        border-radius: 5px;
        font-size: 25px;
        cursor: pointer;
    }

    .btn:active{
        background: black;
    }
</style>