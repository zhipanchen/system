<template>
    <div id="checkCourse-tableDiv">
        <p id="tableTipP"></p>
        <selectDiv></selectDiv>
        <p id="tableInfoP"></p>
        <tableVue></tableVue>

    </div>
</template>

<script>
    import selectDiv from './messageNot-selecttDiv.vue'
    import tableVue from './messageNot-tableVuee.vue'
    export default {
        name: 'checkCourse-tableDiv',
        data () {
            return {
                term: '',

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
