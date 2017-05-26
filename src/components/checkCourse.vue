<template>
    <div id="checkCourse">
        <topTitle></topTitle>
        <topBar></topBar>
        <tableDiv></tableDiv>

    </div>
</template>

<script>
    import topTitle from './public/topTitle/topTitle.vue'
    import topBar from './teacher/basicMessagePage/topBar/topBar.vue'
    import tableDiv from './teacher/basicMessagePage/table/table.vue'
    export default {
        name: 'checkCourse',
        data () {
            return {
                msg: ''
            }
        },
        components: {
            topTitle,
            topBar,
            tableDiv
         /*   selDiv*/
        }
    }

</script>

<style lang="css">
    html{
        font-size: 16px;
    }
    body{
        text-align: center;
        background-color: ghostwhite;
        font-family: 微软雅黑;
    }
    @media screen and (max-width:1023px) {
        html {
            font-size: 9px;
        }
    }
</style>
