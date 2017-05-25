<template>
  <div id="evaTeachingResultPageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <router-link to="/eduAdmin/manage/examination/eduAdminTchTeachingPlan"><button class="am-btn am-btn-success" style="margin-left: 5rem">教师教学计划</button></router-link>
    <button class="am-btn am-btn-success btn-active">教务查看评教</button>
  </div>
</template>

<script>
    export default {
        name: 'evaTeachingResultPageTopBar',
        data () {
            return {
                msg: ''
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
