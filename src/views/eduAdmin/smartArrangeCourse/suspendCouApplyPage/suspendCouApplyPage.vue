<template>
  <!--查看停课申请页面-->
  <div id="suspendCouApply">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <!--查看停课申请页面主组件-->
    <suspendCouApplyDiv></suspendCouApplyDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/smartArrangeCourse/suspendCouApplyPage/topBar/topBar.vue'
  import suspendCouApplyDiv from '../../../../components/eduAdmin/smartArrangeCourse/suspendCouApplyPage/suspendCouApplyDiv/suspendCouApplyDiv.vue'
  export default {
    name: 'suspendCouApply',
    data () {
      return {

      }
    },
    mounted: function() {
      var dom = document.getElementById("suspendCouApply");
      dom.style.height = window.innerHeight *0.85 + "px";
    },
    components: {
      topTitle,
      topBar,
      suspendCouApplyDiv
    }
  }

</script>

<style scoped>
  html{
  }
  #suspendCouApply{
  }
  @media screen and (max-width:1023px) {
    html {
    }
  }
</style>
