<template>
  <!--使用import引入的组件组合page页面-->
  <div id="evaTeachingReasultPage">
    <topTitle></topTitle>
    <topBar></topBar>
    <noSupervisorTable></noSupervisorTable>
  </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/eduManage/supervisorManagePage/topBar/topBar.vue'
  import noSupervisorTable from '../../../../components/eduAdmin/eduManage/supervisorManagePage/noSupervisorTable/noSupervisorTable.vue'
  export default {
    name: 'manageClassPage',
    data () {
      return {
        msg: ''
      }
    },
    /*注册import引入的单文件组件*/
    components: {
      topTitle,
      topBar,
      noSupervisorTable
    }
  }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #evaTeachingReasultPage{
      min-height: 50rem;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
