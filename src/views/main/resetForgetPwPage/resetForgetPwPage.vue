<template>
  <div id="resetForgetPassword" :style="{ backgroundImage: 'url(' + img1 + ')' }">
    <div id="main">
      <div id="titleDiv">
        <a :href="imgHref"><img id="schoolImg" src="../../../assets/images/title.png" alt="四川省医科科学院·四川省人民医院·护士学校" ></a>
        <div id="userExitDiv">
          <a :href="exitHref"><img id="exitImg" src="../../../assets/images/exit.png" alt="退出图标" @click="exitAlert"></a>
        </div>
      </div>
      <div id="stepDiv">
        <Steps :current="2">
          <Step title="已完成" content="输入帐号与验证邮箱"></Step>
          <Step title="已完成" content="发送验证邮件"></Step>
          <Step title="进行中" content="设置新密码"></Step>
        </Steps>
      </div>
      <div id="inputDiv">
        <p class="operationP">
          输入新密码：
          <input type="password" v-model="newPwd">
        </p>
        <p class="operationP">
          确认新密码：
          <input type="password" v-model="confirmPwd">
        </p>
        <p class="operationP">
          <button id="nextButton" class="am-btn am-btn-success am-radius" @click="nextClick">确定</button>
        </p>
        <p id="tipP">加载中……</p>
      </div>
    </div>
  </div>
</template>

<script>
  var CryptoJS = require("crypto-js");
  export default {
    name: "resetForgetPassword",
    data () {
      return {
        img1: require("../../../assets/images/login-background.png"),//页面背景图片
        imgHref: "http://www.samsph.com/hsxx/1092/1/",//官网
        exitHref: "#/login",
        newPwd: "",
        confirmPwd: "",
        userId: ""
      }
    },
    mounted: function() {
      var dom = document.getElementById("resetForgetPassword");
      dom.style.height = window.innerHeight + "px";
      var thisURL = document.URL;
      var param =thisURL.split("?")[1];
      var paramA= param.split("&")[0];
      var paramB= param.split("&")[1];
      var sid = null;
      if(paramA.split("=")[0] == "sid"){
        sid = paramA.split("=")[1];
        this.userId = paramB.split("=")[1];
      }else{
        this.userId = paramA.split("=")[1];
        sid = paramB.split("=")[1];
      }
//      this.$http.post('../testPhp/loginCheck.php', {
      this.$http.post('./checkLink', {
          "sid": sid,
          "userId": this.userId
      }, {
        "Content-Type": "application/json"
      }).then(function (response) {
        console.log(response.body);
        var operationP = document.getElementsByClassName("operationP");
        var tipP = document.getElementById("tipP");
        try{
          if(response.body.result == "1"){
            for(var i = 0;i < operationP.length;i++){
              operationP[i].style.display = "block";
            }
            tipP.style.display = "none";
          }else if(response.body.result == "2"){
            tipP.innerHTML = "验证链接超时失效，请重试！"
          }else{
            tipP.innerHTML = "验证链接有误，请重试！"
          }
        }catch (e){
          console.log(e);
        }
      }, function (error) {
        document.getElementById("tipP").innerHTML = "连接失败！请重试！";
        console.log(error);
      });
    },
    methods: {
      nextClick: function(){
        if(this.newPwd != this.confirmPwd){
          alert("两次输入的新密码不相同！");
        }else{
          var a = CryptoJS.MD5(this.newPwd + this.userId + "护士学校");
          a = a.toString().toUpperCase();
          function encrypt(data) {
            var key  = CryptoJS.enc.Latin1.parse('uestc2017nurse01');
            var iv   = CryptoJS.enc.Latin1.parse('10esrun7102ctseu');
            return CryptoJS.AES.encrypt(data, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
          }
//          this.$http.post('../testPhp/loginCheck.php', {
          this.$http.post('./setNewPwd', {
            "userId": this.userId,
            "newPwd": JSON.stringify(encrypt(a))
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            console.log(response.body);
            if(response.body.result == "1"){
              alert("修改成功，请牢记新密码！");
              location.href = '#/login';
            }else{
              alert("修改失败，请确认新密码是否符合要求或验证是否仍有效！")
            }
          }, function (error) {
            alert("连接失败，请确认重试！");
            console.log(error);
          });
        }
      }
    }
  }
</script>

<style scoped>
  #schoolImg{
    height: 3rem;
    border-radius: 1rem;
  }
  #userExitDiv{
    float: right;
    display: flex;
    align-items: center;
    position: relative;
    top: 0.5rem;
  }
  #exitImg{
    position: relative;
    top: 0.2rem;
    padding-left: 0.7rem;
    width: 2rem;
    height: 2rem;
  }
  #main{
    border: solid LightGreen;
    background-color: white;
    border-radius: 1rem;
    height: 55%;
    width: 50%;
    margin: 0 auto;
    position: relative;
    top: 20%;
    padding: 1rem;
  }
  #stepDiv{
    margin-left: 15%;
    margin-top: 1rem;
    background-color: white;
  }
  #titleDiv{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 1rem;
  }
  #inputDiv{
    border-top: thin solid #f3f3f3;
    height: inherit;
    margin: 1rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .operationP{
    display: none;
  }
  #nextButton{
    width: 5.6rem;
  }
  #tipP{
    font-size: 1.2rem;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
