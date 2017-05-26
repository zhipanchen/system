<template>
  <div id="tchTeachingPlanPageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <button class="am-btn am-btn-success btn-active" style="margin-left: 5rem">教学计划</button>
    <router-link to="/eduAdmin/manage/examination/eduAdminEvaTeachingResult"><button class="am-btn am-btn-success">教务查看评教</button></router-link>
  </div>
</template>

<script>
    export default {
        name: 'tchTeachingPlanPageTopBar',
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
