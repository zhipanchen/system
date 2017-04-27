<template>
  <div id="forgetPassword" :style="{ backgroundImage: 'url(' + img1 + ')' }">
    <div id="main">
      <div id="titleDiv">
        <a :href="imgHref"><img id="schoolImg" src="../../../assets/images/title.png" alt="四川省医科科学院·四川省人民医院·护士学校" ></a>
        <div id="userExitDiv">
          <a :href="exitHref"><img id="exitImg" src="../../../assets/images/exit.png" alt="退出图标" @click="exitAlert"></a>
        </div>
      </div>
      <div id="stepDiv">
        <Steps :current="current">
          <Step :title="step1" content="输入帐号与验证邮箱"></Step>
          <Step :title="step2" content="发送验证邮件"></Step>
          <Step title="待进行" content="设置新密码"></Step>
        </Steps>
      </div>
      <div id="inputDiv">
        <p class="operationP">
          帐号：
          <input type="text" v-model="userId">
        </p>
        <p class="operationP">
          邮箱：
          <input type="text" v-model="email">
        </p>
        <p class="operationP">
          <button id="nextButton" class="am-btn am-btn-success am-radius" @click="nextClick">下一步</button>
        </p>
        <p id="emailP" style="display: none;font-size: 1.2rem"></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "forgetPassword",
    data () {
      return {
        img1: require("../../../assets/images/login-background.png"),//页面背景图片
        imgHref: "http://www.samsph.com/hsxx/1092/1/",//官网
        exitHref: "#/login",
        step1: "进行中",
        step2: "待进行",
        current: 0,
        userId: "",
        email: ""
      }
    },
    mounted: function() {
      var dom = document.getElementById("forgetPassword");
      dom.style.height = window.innerHeight + "px";
    },
    methods: {
      nextClick: function(){
//        this.$http.post('../testPhp/loginCheck.php', {
        this.$http.post('./findbackPwd', {
          "userId": this.userId,
          "email": this.email
        }, {
          "Content-Type": "application/json"
        }).then(function (response) {
          console.log(response.body);
          if(response.body.result == "1"){
            this.current = 1;
            this.step1 = "已完成";
            this.step2 = "进行中";
            var operationP = document.getElementsByClassName("operationP");
            for(var i = 0;i < operationP.length;i++){
              operationP[i].style.display = "none";
            }
            var emailP = document.getElementById("emailP");
            emailP.style.display = "block";
            emailP.innerHTML = "验证邮件已发送到"+this.email+",请在有效期内点击打开邮件内链接完成验证。";
          }else{
            alert("帐号或邮件地址有误！请确认重试！");
          }
        }, function (error) {
          alert("连接失败！请重试！");
          console.log(error);
        });
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
  #nextButton{
    width: 5.6rem;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
