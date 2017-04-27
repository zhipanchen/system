<template>
  <div id="couStaffTopBar" class="topBarDiv am-btn-group">
      <button id="banCouButton" class="am-btn am-btn-success" @click="banCouClick">
        {{ banCouButton }}
        <!--<p class="NullInfoP"></p>-->
      </button>
      <!--禁止排课设置-->
      <button id="arrApplyButton" class="am-btn am-btn-success" @click="arrApplyClick">
        {{ arrApplyButton }}
        <!--<p v-if="arrInfoNum != 0" class="NewInfoP">{{ arrInfoNum }}</p>-->
        <!--<p v-else class="NullInfoP">0</p>-->
      </button>
      <!--查看排课申请-->
      <button id="adjApplyButton" class="am-btn am-btn-success" @click="adjApplyClick">
        {{ adjApplyButton }}
        <!--<p v-if="adjInfoNum != 0" class="NewInfoP">{{ adjInfoNum }}</p>-->
        <!--<p v-else class="NullInfoP">0</p>-->
      </button>
      <!--查看调课申请-->
      <button id="checkCouButton" class="am-btn am-btn-success" @click="checkCouClick">
        {{ checkCouButton }}
        <!--<p class="NullInfoP"></p>-->
      </button>
    <!--查看当前课表-->
  </div>
</template>

<script>
  export default {
    name: 'couStaffTopBar',
    data () {
      return {
        banCouButton: '禁止排课设置',
        arrApplyButton: '查看排课申请',
        adjApplyButton: '查看调课申请',
        checkCouButton: '查看当前课表',
        arrInfoNum: '2',//预留实时获取新消息提示
        adjInfoNum: '4',//预留实时获取新消息提示
        banCouUrl: '../关于iview的使用.zip',
        arrApplyUrl: '#/',
        adjApplyUrl: '#/eduAdmin/adjustCouApply',
        checkCouUrl: '#/eduAdmin/checkCourse',
      }
    },
    props:['activeVue'],//当前页面
    created: function(){

    },
    mounted: function(){
      if(this.activeVue == this.banCouUrl) {
        var banCouButton = document.getElementById('banCouButton');
        banCouButton.className += " btn-active";
      }
      if(this.activeVue == this.arrApplyUrl) {
        var arrApplyButton = document.getElementById('arrApplyButton');
        arrApplyButton.className += " btn-active";
      }
      if(this.activeVue == this.adjApplyUrl) {
        var adjApplyButton = document.getElementById('adjApplyButton');
        adjApplyButton.className += " btn-active";
      }
      if(this.activeVue == this.checkCouUrl) {
        var checkCouButton = document.getElementById('checkCouButton');
        checkCouButton.className += " btn-active";
      }
    },//加载页面后触发钩子，根据当前页面url进行按钮变色
    methods: {
//      跳转到禁止排课设置页面
      banCouClick: function () {
        location.href = this.banCouUrl;
      },
//      跳转到查看排课申请页面
      arrApplyClick: function () {
        location.href = this.arrApplyUrl;
      },
//      跳转到查看调课申请页面
      adjApplyClick: function () {
        location.href = this.adjApplyUrl;
      },
//      跳转到查看课表设置页面
      checkCouClick: function () {
        location.href = this.checkCouUrl;
      }
    }
  }
</script>

<style scoped>
  html{
  }
  #couStaffTopBar{
    /*页面*/
  }
  #banCouButton{
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
    }
  }
</style>
