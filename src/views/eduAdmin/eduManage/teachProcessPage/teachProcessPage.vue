<template>
    <!--使用import引入的组件组合page页面-->
    <div id="teachProcessPage">
      <topTitle></topTitle>
      <topBar></topBar>
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 培养方案管理 > 教学进度 </span>
      </div>
      <tchingProcess></tchingProcess>
    </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/eduManage/teachProcessPage/topBar/topBar.vue'
  import tchingProcess from '../../../../components/eduAdmin/eduManage/teachProcessPage/tchingProcess/tchingProcess.vue'
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
      tchingProcess
    }
  }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #teachProcessPage{
      min-height:50rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
