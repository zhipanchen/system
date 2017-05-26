<template>
  <div id="topTitleDiv">
    <a :href="imgHref"><img id="schoolImg" src="./images/title.png" :alt="imgAlt" ></a>
    <div id="userExitDiv">
      <a id="user" :href="userHref">您好,{{ userName }}!</a>
      <a><img id="exitImg" src="./images/exit.png" alt="exitAlt" @click="modal = true"></a>
    </div>
    <Modal
        v-model="modal"
        width="400"
        :mask-closable="false"
        id="modalBody">
      <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
        <span>注销登录</span>
      </div>
      <div style="font-size: 0.9rem;text-align: left;">
        <p>您确定要注销并返回登录页面？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="exitAlert">确定</button>
        <button id="modalBtn" @click="modal = false">取消</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'topTitleDiv',
    data () {
      return {
        imgHref: 'http://www.samsph.com/hsxx/1092/1/',//医院官网
        userHref: '',//跳转到主页
        userName: '',//显示用户名
        imgAlt: '四川省医科科学院·四川省人民医院',
        exitAlt: '退出图标',
        modal: false
      }
    },
    beforeMount: function() {
//      this.$http.post('',{},{
      this.$http.post('./getCurrentUser',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log(response);
//        if(response.status == "302"){
//          location.href = "#/login";
//        }else {
          if (sessionStorage.getItem("userType") == "1") {
            this.userHref = "#/student/setting/studentInformation";
          } else {
            this.userHref = "#/teacher/personInfo/basicMessage";
          }
          this.userName = response.body.currentUserName + "(" + response.body.currentUserId + ") ";
          sessionStorage.setItem("userInfo", JSON.stringify(response.body));
//        }
      },function(error){
//        console.log(error);
//        if(error.status == "302"){
//          location.href = "#/login";
//        }
        this.$Message.error('连接失败，请重试！',3);
      });
    },
    methods: {
      exitAlert: function () {
//        注销登录
        this.$http.post('./logout',{},{
          "Content-Type":"application/json"
        }).then(function(response){
          location.href = "#/login";
        },function(error){
          this.$Message.error('连接失败，请重试！',3);
        });
      }
    }
  }
</script>

<style scoped>
  html{
    font-size: 100%;
  }
  a{
    text-decoration: none;
  }
  #topTitleDiv{
    text-align: left;
    background-color: white;
    margin: 0 5rem;
  }
  #schoolImg{
    /*学校图标*/
    /*width: 18rem;*/
    height: 3rem;
    border-right: 0.1rem solid whitesmoke;
    /*padding: 0.5rem;*/
  }
  #userExitDiv{
    /*用户姓名与退出*/
    float: right;
    display: flex;
    align-items: center;
    position: relative;
    top: 0.5rem;
  }
  #user{
    /*用户姓名*/
    color: black;
    text-decoration: none;
    font-size: 1rem;
  }
  #exitImg{
    /*退出图标*/
    position: relative;
    top: 0.2rem;
    padding-left: 0.7rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  @media screen and (max-width:1023px){
    html{
      font-size: 56%;
    }
  }
</style>
