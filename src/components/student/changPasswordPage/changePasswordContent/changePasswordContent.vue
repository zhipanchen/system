<template>
    <div id="changePasswordContent">
      <div class="blank">
          <label class="title">当前所在位置：修改密码</label>
          <button id="backButton" class="am-btn am-btn-success am-radius" @click="backClick">返回</button>
      </div>
      <div class="content">
        <div class="empty"></div>
        <div class="contentInputGroup">
          <span class="inputTitle">修改密码</span>
          <hr class="line">
          <div class="centerDiv">
            <span class="inputSpanStyle">当前密码：</span>
            <input type="password" class="inputGroupStyle" v-model="nowPassword"/>
          </div>
          <div class="centerDiv">
            <span class="inputSpanStyle">更新密码：</span>
            <input type="password" class="inputGroupStyle" v-model="newPassword"/>
          </div>
          <div class="centerDiv">
            <span class="inputSpanStyle">确定密码：</span>
            <input type="password" class="inputGroupStyle" v-model="newPasswordAgain"/>
          </div>
          <button class="confirmButton am-btn am-btn-success am-radius" @click="confirmClick">确定</button>
        </div>
      </div>
    </div>
</template>

<script>
  var CryptoJS=require("crypto-js");
    export default {
        name: 'changePasswordContent',
        data () {
            return {
              nowPassword:'',
              newPassword:'',
              newPasswordAgain:'',
              modal1:false,
              modal2:false
            }
        },
        methods:{
          backClick: function(){
          alert("返回");
        },
          confirmClick:function() {
            if (this.nowPassword == '' || this.newPassword == '' || this.newPasswordAgain == '') {
              alert('输入不能为空！');
            }
            else {
              if (this.newPassword !=this.newPasswordAgain){
                alert('新密码与确认密码不一致！');
                }else {
                var a = CryptoJS.MD5(this.nowPassword + "0402" + "护士学校");//MD5加密
                alert(a);
                var b=CryptoJS.MD5(this.newPassword + "0402" + "护士学校");//MD5加密
                a = a.toString().toUpperCase();//转16进制字符串,大写化
                b = b.toString().toUpperCase();//转16进制字符串,大写化
                function encrypt(data) {
                  //AES加密函数
                  var key  = CryptoJS.enc.Latin1.parse('uestc2017nurse01');
                  var iv   = CryptoJS.enc.Latin1.parse('10esrun7102ctseu');
                  return CryptoJS.AES.encrypt(data, key, {
                    iv:iv,
                    mode:CryptoJS.mode.CBC,
                    padding:CryptoJS.pad.ZeroPadding
                  }).toString();
                }
                this.$http.post('./resetPwd', {
                  "userPwd": JSON.stringify(encrypt(a)),
                  "newPwd": JSON.stringify(encrypt(b))
                  //对MD5加密结果进行AES加密,并JSON字符串化,传递后端
                }, {
                  "Content-Type": "application/json"
                }).then(function (response) {
                  console.log(response.body);
                  if(response.body.result == "1"){
                    alert('密码修改成功！');
                  }else{
                    alert("密码修改不成功！");
                  }
                }, function (error) {
                  alert("连接失败,请确认重试！");
                  console.log(error);
                });
              }
            }
          }
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #backButton{
      /*登录按钮*/
      float:right;
      margin-right:5rem;
      margin-top:0.6rem;
      color: white;
      width: 5.6rem;
      vertical-align: bottom;
      outline: none;
    }
    .title{
      display: block;
      float:left;
      margin-left:5rem;
      height:3.5rem;
      vertical-align: middle;
    }
    .content{
      background-color:#F3F3F3;
      width:100%;
    }
    .empty{
      width:2rem;
      height:2rem;
    }
    .contentInputGroup{
      width:20rem;
      margin:0 auto;
    }
    .centerDiv{
      margin:0 auto;
    }
    .inputTitle{
      font-size: 1rem;
    }
    .line{
      border-bottom-color: #00a539;
      width: 100%;
    }
    .inputSpanStyle{
      font-size:1rem;
    }
    .inputGroupStyle{
      outline: none;
      font-size:1rem;
      margin-top:1.5rem;
      border-radius:0.3rem;
      border:0.1rem solid #000000;
    }
    .confirmButton{
      display: block;
      margin:2rem auto;
      width: 5.6rem;
      color: white;
      outline: none;
    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
