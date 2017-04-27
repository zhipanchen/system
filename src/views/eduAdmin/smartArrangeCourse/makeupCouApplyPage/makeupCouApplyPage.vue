<template>
  <!--查看补课申请页面-->
  <div id="makeupCouApply">
    <topTitle></topTitle>
    <!--导航栏组件-->
    <topBar></topBar>
    <!--查看补课申请页面主组件-->
    <makeupCouApplyDiv></makeupCouApplyDiv>
  </div>
</template>

<script>
  import topTitle from './../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/smartArrangeCourse/makeupCouApplyPage/topBar/topBar.vue'
  import makeupCouApplyDiv from '../../../../components/eduAdmin/smartArrangeCourse/makeupCouApplyPage/makeupCouApplyDiv/makeupCouApplyDiv.vue'
  export default {
    name: 'makeupCouApply',
    data () {
      return {

      }
    },
    mounted: function() {
      var dom = document.getElementById("makeupCouApply");
      dom.style.height = window.innerHeight *0.85 + "px";
    },
    components: {
      topTitle,
      topBar,
      makeupCouApplyDiv
    }
  }

</script>

<style scoped>
  html{
  }
  #makeupCouApply{

  }
  @media screen and (max-width:1023px) {
    html {
    }
  }
</style>
