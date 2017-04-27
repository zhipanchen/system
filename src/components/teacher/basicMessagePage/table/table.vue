<template>
    <div id="selfMessage-teacher-tableDiv">
            <div id="tableLeft">
                <span id="subtitle1">{{subtitle1}}</span>
           <ul>
               <li id="li"><a href="#">基本信息</a></li>
               <li><a href="#">教育管理</a></li>
               <li><a href="#">证书管理</a></li>
               <li><a href="#">一线工作经历</a></li>
               <!--<li><a href="#">教学进修</a></li>-->
               <li><a href="#">密码修改</a></li>
           </ul>
            </div>
            <div id="tableRight">
                <span id="subtitle2">{{subtitle2}}</span>
                <div id="tableDiv">
                <table>
                    <tr>
                        <td>工号：</td>
                        <td><input type="text" v-model="teacherId"  readonly/></td>
                    </tr>
                    <tr>
                        <td>所属教研组：</td>
                        <td><input type="text" v-model="targroupName" readonly/></td>
                    </tr>
                    <tr>
                        <td>姓名：</td>
                        <td><input type="text" v-model="teacherName"  readonly/></td>
                    </tr>
                    <tr>
                        <td>性别：</td>
                        <td><input type="text" v-model="teacherGender"/></td>
                    </tr>
                    <tr>
                        <td>出生年月：</td>
                        <td><input type="text" v-model="birthdate" /></td>
                    </tr>
                    <tr>
                        <td>身份证号;</td>
                        <td><input type="text" v-model="teacherIDcard" /></td>
                    </tr>
                    <tr>
                        <td>参加工作时间：</td>
                        <td><input type="text" v-model="worktime" /></td>
                    </tr>
                    <tr>
                        <td>当前工作单位：</td>
                        <td><input type="text" v-model="currentWorkUnit" /></td>
                    </tr>




                </table>
                <table>

                    <tr>
                        <td>是否双师型：</td>
                        <td><input type="text" v-model="isDoubleTeacher"  readonly/></td>
                    </tr>
                    <tr>
                        <td>聘用校区：</td>
                        <td><input type="text" v-model="hireCampus"  readonly/></td>
                    </tr>
                    <tr>
                        <td>联系电话;</td>
                        <td><input type="text" v-model="phoneNumber" /></td>
                    </tr>
                    <tr>
                        <td>Email：</td>
                        <td><input type="text" v-model="emailAddress" /></td>
                    </tr>
                    <tr>
                        <td>QQ：</td>
                        <td><input type="text" v-model="qqNumber" /></td>
                    </tr>
                  <tr>
                    <td>临床工作年限：</td>
                    <td><input type="text" v-model="clinicWorkYear" /></td>
                  </tr>
                  <tr>
                    <td>当前工作职务：</td>
                    <td><input type="text" v-model="currentWorkDuty"  readonly/></td>
                  </tr>
                  <tr>
                    <td>当前工作职称：</td>
                    <td><input type="text" v-model="currentWorkTitle"  readonly/></td>
                  </tr>




                </table>
                </div>
                <div id="buttonDiv">
                <button class="am-btn am-btn-success am-radius" @click="save(teacherId,targroupName,
                teacherName,teacherGender,birthdate,teacherIDcard,worktime,currentWorkUnit,isDoubleTeacher,hireCampus,
                phoneNumber,emailAddress,qqNumber,clinicWorkYear,currentWorkDuty,currentWorkTitle)">保存</button>
                <button class="am-btn am-btn-success am-radius" @click="cancel()">取消</button>
                </div>
                <div>
    </div>
              </div>
      </div>
</template>

<script>
    export default {
        name:'selfMessage-teacher-tableDiv',
        data () {
                       return {
                               subtitle1:'个人信息',
                               subtitle2:'基本信息',
                               teacherId:'',
                               targroupName:'',
                               teacherName:'',
                               teacherGender:'',
                               birthdate:'',
                               teacherIDcard:'',
                               worktime:'',
                               currentWorkUnit:'',
                               isDoubleTeacher:'',
                               hireCampus:'',
                               phoneNumber:'',
                               emailAddress:'',
                               qqNumber:'',
                               clinicWorkYear:'',
                               currentWorkDuty:'',
                               currentWorkTitle:''
                               }
                    },
      beforeMount:function(){
        this.$http.post('./teacherManage/getTeacherBasicInfo',{},
          {"Content-Type":"application/json"}).then(function (response) {
            console.log(response);
                this.teacherId=response.body.teacherId;
                this.targroupName=response.body.targroupName;
                this.teacherName=response.body.teacherName;
                this.teacherGender=response.body.teacherGender;
                this.birthdate=response.body.birthdate;
                this.teacherIDcard=response.body.teacherIDcard;
                this.worktime=response.body.worktime;
                this.currentWorkUnit=response.body.currentWorkUnit;
                this. isDoubleTeacher=response.body.isDoubleTeacher;
                this. hireCampus=response.body.hireCampus;
                this. phoneNumber=response.body.phoneNumber;
                this.emailAddress=response.body.emailAddress;
                this.qqNumber=response.body.qqNumber;
                this.clinicWorkYear=response.body.clinicWorkYear;
                this.currentWorkDuty=response.body.currentWorkDuty;
                this.currentWorkTitle=response.body.currentWorkTitle
          },
          function(error){
            console.log("获取error:");
            console.log(error);
          });
      },
      methods: {
        save:function(teacherId,targroupName,
                      teacherName,teacherGender,birthdate,teacherIDcard,worktime,currentWorkUnit,isDoubleTeacher,hireCampus,
                      phoneNumber,emailAddress,qqNumber,clinicWorkYear,currentWorkDuty,currentWorkTitle){
          this.$http.post('./teacherManage/editTeacherBasicInfo',{
            "teacherId":teacherId,
            "targroupName":targroupName,
            "teacherName":teacherName,
            "teacherGender":teacherGender,
            "birthdate":birthdate,
            "teacherIDcard":teacherIDcard,
            "worktime":worktime,
            "currentWorkUnit":currentWorkUnit,
            "isDoubleTeacher":isDoubleTeacher,
            "hireCampus":hireCampus,
            "phoneNumber":phoneNumber,
            "emailAddress":emailAddress,
            "clinicWorkYear":clinicWorkYear,
            "qqNumber":qqNumber,
            "currentWorkDuty":currentWorkDuty,
            "currentWorkTitle":currentWorkTitle
          },{"Content-Type":"application/json"}).then(function (response) {
              console.log("传递:");
              console.log(response.body);
              if(response.body.result=="1")
              {alert("success!")}
            },
            function(error){
              console.log("传递error:");
              console.log(error);
            });
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
        justify-content: space-between;
        padding: 1rem 3rem;
        border-top: 0.15rem solid #158064;
        position: relative;
        top:1rem;
        height:20rem;
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
    }
    button{
     width:5.6rem;
     margin:0.7rem;
    }
   input{
       width:10rem;
   }
</style>
