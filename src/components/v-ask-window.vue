<template>
    <div class="v-ask-window">
        <div class="window">
            <div>Вы уверены что хотите удалить?</div>
            <router-link :to="{name:'notes'}">
                <div class="btn" @click="deleteNote">да</div>
            </router-link>
            <div class="btn" @click="noDelete">нет</div>
        </div>
    </div>
</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: "v-ask-window",
        components: {},
        props: {},
        data() {
            return {};
        },
        methods: {
            ...mapActions([
                'DELETE_NOTE'
            ]),

            noDelete() {
                document.querySelector('.v-ask-window').style = 'display: none'
            },
            deleteNote() {
                this.DELETE_NOTE();
                document.querySelector('.v-ask-window').style = 'display: none'
            },
        }
    }
</script>

<style scoped>
    .v-ask-window{
        display: none;
        justify-content: center;
    }
    .window{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin-top: 25%;
        border-radius: 20px;
        border: 3px solid red;
        width: 450px;
        height: 250px;
        background: #d2f399;
        justify-items: center;
        align-items: center;
    }
    .window div:nth-child(1){
        grid-column: 1 / -1;
    }
    .window div:nth-child(2){
        grid-column: 1 / 2;
    }
    .window div:nth-child(3){
        grid-column: 3 / 4;
    }
    .btn{
        background: blue;
        width: 120px;
        height: 30px;
        text-align: center;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        padding-top: 6px;
    }
    .btn:active{
        background: black;
    }
</style>