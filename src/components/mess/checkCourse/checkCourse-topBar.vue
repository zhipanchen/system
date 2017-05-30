<template>
  <div id="topBarDiv">
    <button id="banCouButton" class="topBarButton" @click="banCouClick">{{ banCouButton }}</button>
    <button id="arrApplyButton" class="topBarButton" @click="arrApplyClick">
      {{ arrApplyButton }}
      <p v-if="arrInfoNum != 0" class="NewInfoP">{{ arrInfoNum }}</p>
      <p v-else class="NullInfoP"></p>
    </button>
    <button id="adjApplyButton" class="topBarButton" @click="adjApplyClick">
      {{ adjApplyButton }}
      <p v-if="adjInfoNum != 0" class="NewInfoP">{{ adjInfoNum }}</p>
      <p v-else class="NullInfoP"></p>
    </button>
    <button id="checkCouButton" class="topBarButton" @click="checkCouClick">{{ checkCouButton }}</button>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        banCouButton: '禁止排课设置',
        arrApplyButton: '查看排课申请',
        adjApplyButton: '查看调课申请',
        checkCouButton: '查看当前课表',
        arrInfoNum: '2',
        adjInfoNum: '0',
//        activeVue: '',
        banCouUrl: 'http://localhost:8080/',
        arrApplyUrl: 'http://localhost:8080/',
        adjApplyUrl: 'http://localhost:8080/',
        checkCouUrl: 'http://localhost:8080/'
      }
    },
    methods: {
      banCouClick: function () {
        if(window.location.href == this.banCouUrl) {
          var banCouButton = document.getElementById('banCouButton');
          banCouButton.style.backgroundColor = "limegreen";
          var arrApplyButton = document.getElementById('arrApplyButton');
          arrApplyButton.style.backgroundColor = "forestgreen";
          var adjApplyButton = document.getElementById('adjApplyButton');
          adjApplyButton.style.backgroundColor = "forestgreen";
          var checkCouButton = document.getElementById('checkCouButton');
          checkCouButton.style.backgroundColor = "forestgreen";
        }
      },
      arrApplyClick: function () {
        if(window.location.href == this.arrApplyUrl) {
          var banCouButton = document.getElementById('banCouButton');
          banCouButton.style.backgroundColor = "forestgreen";
          var arrApplyButton = document.getElementById('arrApplyButton');
          arrApplyButton.style.backgroundColor = "limegreen";
          var adjApplyButton = document.getElementById('adjApplyButton');
          adjApplyButton.style.backgroundColor = "forestgreen";
          var checkCouButton = document.getElementById('checkCouButton');
          checkCouButton.style.backgroundColor = "forestgreen";
        }
      },
      adjApplyClick: function () {
        if(window.location.href == this.adjApplyUrl) {
          var banCouButton = document.getElementById('banCouButton');
          banCouButton.style.backgroundColor = "forestgreen";
          var arrApplyButton = document.getElementById('arrApplyButton');
          arrApplyButton.style.backgroundColor = "forestgreen";
          var adjApplyButton = document.getElementById('adjApplyButton');
          adjApplyButton.style.backgroundColor = "limegreen";
          var checkCouButton = document.getElementById('checkCouButton');
          checkCouButton.style.backgroundColor = "forestgreen";
        }
      },
      checkCouClick: function () {
        if(window.location.href == this.checkCouUrl) {
          var banCouButton = document.getElementById('banCouButton');
          banCouButton.style.backgroundColor = "forestgreen";
          var arrApplyButton = document.getElementById('arrApplyButton');
          arrApplyButton.style.backgroundColor = "forestgreen";
          var adjApplyButton = document.getElementById('adjApplyButton');
          adjApplyButton.style.backgroundColor = "forestgreen";
          var checkCouButton = document.getElementById('checkCouButton');
          checkCouButton.style.backgroundColor = "limegreen";
        }
      }
    }
  }
</script>

<style lang="css">
  html{
    font-size: 16px;
  }
  #topBarDiv{
    text-align: center;
    background-color: forestgreen;
    position: relative;
    align-items:center;
    width: 100%;
    height: 5rem;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
  }
  li{
    list-style: none;
    float: left;
    margin-right: 12rem;
  }
  .NewInfoP{
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    background-color: red;
    float: right;
    font-size: 0.75rem;
    position: relative;
    bottom: 0.5rem;
    margin: 0;
  }
  .NullInfoP{
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    background-color: red;
    float: right;
    font-size: 0.75rem;
    position: relative;
    bottom: 0.5rem;
    margin: 0;
    visibility: hidden;
  }
  .topBarButton,.topBarButton:active{
    display: block;
    font-weight: bold;
    color: white;
    background-color: forestgreen;
    text-align: center;
    font-size: 1rem;
    padding: 2rem;
    border: none;
    outline: none;
  }
  .topBarButton:hover {
    background-color: limegreen;
    cursor: pointer;
  }
  #checkCouButton{
    background-color: limegreen;
  }
  /*@media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }*/
</style>
