<template>
    <!--使用import引入的组件组合page页面-->
    <div id="eduPlanPage">
      <topTitle></topTitle>
      <topBar></topBar>
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 培养方案管理 > 培养方案 </span>
      </div>
      <teachingPlan></teachingPlan>
    </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/eduManage/eduPlanPage/topBar/topBar.vue'
  import teachingPlan from '../../../../components/eduAdmin/eduManage/eduPlanPage/teachingPlan/teachingPlan.vue'
  export default {
    name: 'eduPlanPage',
    data () {
      return {
        msg: ''
      }
    },
    /*注册import引入的单文件组件*/
    components: {
      topTitle,
      topBar,
      teachingPlan
    }
  }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #eduPlanPage{
      min-height: 50rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
