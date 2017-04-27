<template>
  <!--使用import引入的组件组合page页面-->
  <div id="authorityManage2Page">
    <topTitle></topTitle>
    <topBar></topBar>
    <div class="blank"></div>
    <dropdownStaff></dropdownStaff>
  </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/userManage/authorityManage2Page/topBar/topBar.vue'
  import dropdownStaff from '../../../../components/eduAdmin/userManage/authorityManage2Page/dropdownStaff/dropdownStaff.vue'
  export default {
    name: 'authorityManage2Page',
    data () {
      return {
        msg: ''
      }
    },
    /*注册import引入的单文件组件*/
    components:{
      topTitle,
      topBar,
      dropdownStaff
    }
  }
</script>

<style scoped>
  html {
    font-size: 100%;
  }
  .blank{
    height: 2.9rem;
  }
  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
