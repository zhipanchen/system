<template>
  <div id="selfMessage-teacher-tableDiv">
    <div id="tableLeft">
      <span id="subtitle1">{{subtitle1}}</span>
      <ul>
        <li id="li"><a href="#">基本信息</a></li>
        <li><a href="#">教育管理</a></li>
        <li><a href="#">证书管理</a></li>
        <li><a href="#">一线工作经历</a></li>
        <li><a href="#">教学进修</a></li>
        <li><a href="#">密码修改</a></li>
      </ul>
    </div>
    <div id="tableRight">
      <span id="subtitle2">{{subtitle2}}</span>
      <div id="tableDiv">
        <table>
          <tr>
            <td>旧密码：</td>
            <td><input type="password" v-model="old" /></td>
          </tr>
          <tr>
            <td>新密码：</td>
            <td><input type="password" v-model="neww" /></td>
          </tr>
          <tr>
            <td>确认密码：</td>
            <td><input type="password" v-model="connew" /></td>
          </tr>


        </table>

      </div>
      <div id="buttonDiv">
        <button class="am-btn am-btn-success am-radius" @click="save(old,neww,connew)">确定</button>
        <button class="am-btn am-btn-success am-radius" @click="cancel">取消</button>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
  var CryptoJs=require("crypto-js");
  export default {
    name:'selfMessage-teacher-tableDiv',
    data () {
      return {
        subtitle1:'个人信息',
        subtitle2:'密码修改',
        old:'',
        new:'',
        connew:''
      }
    },
    methods: {
      save:function(oldone,newone,connewone){
        if(newone==connewone){
          var a=CryptoJs.MD5(oldone+"0402护士学校");//md5加密
          a = a.toString().toUpperCase();//转16进制字符串，大写
          var b=CryptoJs.MD5(newone+"0402护士学校");//md5加密
          b = b.toString().toUpperCase();//转16进制字符串，大写
          function  encrypt(data){
            //AES加密
            var key = CryptoJs.enc.Latin1.parse('uestc2017nurse01');
            var iv=CryptoJs.enc.Latin1.parse('10esrun7102ctseu');
            return CryptoJs.AES.encrypt(data,key,{
              iv:iv,
              mode:CryptoJs.mode.CBC,
              padding:CryptoJs.pad.ZeroPadding
            }).toString();
          }
        this.$http.post('./resetPwd',{
          "userPwd":JSON.stringify(encrypt(a)),
          "newPwd":JSON.stringify(encrypt(b)),
          "userId":"0402"
        },
          {"Content-Type":"application/json"}).then(function (response) {
            console.log(response);
            if(response.body.result=="1"){
              alert("操作成功！")
            }
          },
          function(error){
            console.log("获取error:");
            console.log(error);
          });}else{alert("密码不一致！")}
      },
      cancel:function(){
        location.reload();
      }
    }

  }

</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html{
    font-size: 16px;
  } /*整个页面的样式*/
  #selfMessage-teacher-tableDiv{
    position:relative;
    display: flex;
    height:30rem;
    background-color: #f3f3f3;
  }/*整个桌面的大小*/
  #tableLeft{
    position:relative;
    top:2rem;
    left:4rem;
    height:30rem;
    width:20%;
    background-color: white;
    text-align: center;
    border:0.15rem solid lightgrey;
  }/*左侧的CSS*/
  #tableRight{
    position: relative;
    float:right;
    top:2rem;
    margin-left:7rem;
    height:30rem;
    width:65%;
    background-color: white;
    text-align: left;
    border:0.15rem solid lightgrey;
    padding-left:1rem;
    padding-right:1rem;
  }/*右侧的CSS*/
  #tableDiv{
    display: flex;
    padding: 1rem 3rem;
    border-top: 0.15rem solid #158064;
    position: relative;
    align-items: center;
    justify-content: center;
    top:1rem;
  }/*表格的CSS*/
  #subtitle1{
    font-size: 1.3rem;
    position: relative;
    top:0.5rem;

  }/*标题一*/
  #subtitle2{
    font-size: 1.3rem;
    position: relative;
    top:0.5rem;
    left:2rem;
  }/*标题二*/
  ul{ list-style-type:none;}/*去点*/
  li{
    height:3rem;
    border-bottom:0.15rem solid lightgrey ;
    position: relative;
    right: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;

  }/*列表*/
  #li{
    border-top: 0.15rem solid #158064;
  }/*左边绿色的那条线*/
  #buttonDiv{
    position: relative;
    top:2rem;
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    /*justify-content: space-around;*/
  }
  button{
    width:5.6rem;
    min-width: 5rem;
    margin:0.7rem;
  }
  tr{
    height:2rem;
  }
</style>
