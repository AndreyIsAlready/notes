<template>
    <div class="v-main-wrapper">
        <a class="title" :href="'/'" >Заметки</a>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: "v-main-wrapper",
        methods: {
            ...mapActions([
                'GET_ALL_NOTES'
            ]),
        },
        mounted() {
            this.GET_ALL_NOTES();
        }
    }
</script>

<style scoped>
    .title{
        display: block;
        text-decoration: inherit;
        color: #5952e2;
        font-size: 50px;
        background: #fdff7a;
    }
</style>