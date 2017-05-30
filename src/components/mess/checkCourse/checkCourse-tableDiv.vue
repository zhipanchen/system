<template>
    <div id="checkCourse-tableDiv">
        <p id="tableTipP">支持分别以班级、教师和教室为条件，对单张课程表和全校的课程表进行查询。</p>
        <selectDiv></selectDiv>
        <p id="tableInfoP">当前课表：{{ term }} {{ week }} {{ classroom }} {{ classNum }} 。</p>
        <tableVue></tableVue>
    </div>
</template>

<script>
    import selectDiv from './checkCourse-selectDiv.vue'
    import tableVue from './checkCourse-tableVue.vue'
    export default {
        name: 'checkCourse-tableDiv',
        data () {
            return {
                term: '',
                week: '',
                classroom: '',
                classNum: ''
            }
        },
        components: {
            selectDiv,
            tableVue
        }
    }
</script>

<style lang="css">
    html{
        font-size: 16px;
    }
    #checkCourse-tableDiv{
        margin: 1rem auto;
        background-color: white;
        width: 80%;
        display: flex;
        flex-direction: column;
    }
    #tableTipP{
        color: grey;
        position: relative;
        left: 1rem;
        text-align: left;
    }
    #tableInfoP{
        text-align: left;
        position: relative;
        left: 1rem;
    }
    /*@media screen and (max-width:1023px) {
        html {
            font-size: 9px;
        }
    }*/
</style>
