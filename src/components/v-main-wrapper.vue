<template>
    <div class="v-main-wrapper">
        <a class="title" :href="'/'" >Заметки</a>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "v-main-wrapper"
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