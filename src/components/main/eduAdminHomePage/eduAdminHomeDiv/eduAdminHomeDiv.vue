<template>
  <div id="eduAdminHomeDiv">
    <div id="menuDiv">
      <Menu
          ref="roleMenu"
          id="menu"
          :active-name="activeName"
          @on-select="roleChange"
          width="auto">
        <Menu-group title="角色类型">
          <Menu-item v-for="(role,index) in roleList" :name="role.roleId" :key="role.roleId">
            {{ role.roleName }}
          </Menu-item>
        </Menu-group>
      </Menu>

      <button class="am-btn am-btn-success am-radius" id="termStartButton" @click="modal1 = true" v-if="isEduAdmin">设置学期开始时间</button>
      <button class="am-btn am-btn-success am-radius" id="evaluationStartButton" @click="modal2 = true" v-if="isEduAdmin">设置评教起止时间</button>
      <button class="am-btn am-btn-success am-radius" id="gradeStartButton" @click="modal3 = true" v-if="isEduAdmin">设置成绩录入时间</button>
      <Modal
          v-model="modal1"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <span>设置学期开始时间</span>
        </div>
        <div style="font-size: 0.9rem;">
          <div style="display: flex;align-items: center;justify-content: center">第一学期：
            <Row>
              <Col span="12">
                <Date-picker v-model="firstDate" format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width: 12rem"></Date-picker>
              </Col>
            </Row>
          </div>
          <div style="display: flex;align-items: center;justify-content: center;margin-top: 1rem">第二学期：
            <Row>
              <Col span="12">
                <Date-picker v-model="secondDate" format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width: 12rem"></Date-picker>
              </Col>
            </Row>
          </div>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="termStart()">确定</button>
          <button id="modalBtn" @click="modal1 = false">取消</button>
        </div>
      </Modal>
      <Modal
          v-model="modal2"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <span>设置评教起止时间</span>
        </div>
        <div style="font-size: 0.9rem;display: flex;flex-direction: column;align-items: center">
          <span style="margin-bottom: 0.5rem" v-text="latelyEvaTime"></span>
          <Row>
            <Col span="12">
            <Date-picker v-model="evaluationDate" format="yyyy年MM月dd日" type="daterange" placeholder="选择日期" style="width: 20rem"></Date-picker>
            </Col>
          </Row>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="evaluationStart()">确定</button>
          <button id="modalBtn" @click="modal2 = false">取消</button>
        </div>
      </Modal>
      <Modal
          v-model="modal3"
          width="400"
          :mask-closable="false"
          id="modalBody"
          :styles="{top:'10rem'}">
        <div slot="header" style="font-size: 1rem;text-align: center;padding: 0.5rem 0;" id="modalHeader">
          <span>设置成绩录入时间</span>
        </div>
        <div style="font-size: 0.9rem;display: flex;flex-direction: column;align-items: center">
          <span style="margin-bottom: 0.5rem" v-text="latelyGradeTime"></span>
          <Row>
            <Col span="12">
            <Date-picker v-model="gradeDate" format="yyyy年MM月dd日" type="daterange" placeholder="选择日期" style="width: 20rem"></Date-picker>
            </Col>
          </Row>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="gradeStart()">确定</button>
          <button id="modalBtn" @click="modal3 = false">取消</button>
        </div>
      </Modal>
    </div>
    <!--iview的菜单组件-->
    <div id="pageDiv">
      <div id="topFuncDiv">
        <span class="pageSpan" v-for="(authorityModel,index) in authorityModels" @click="inFuncClick(index)">
          <Badge :count="authorityModel.msgNum">
            <img class="modelImg" src="" :alt="authorityModel.name"><div>{{ authorityModel.name }}</div>
          </Badge>
        </span>
      </div>
      <!--功能块-->
    </div>
    <div id="announcementDiv">
      <span id="topSpan"></span>
      <!--制造边框-->
      <ul id="nameUl">
        <li v-for="announcement in announcementList" :class="announcement.announcementType" :title="announcement.announcementName"  @click="announcementClick(announcement.announcementId)">
          <span class="announcementName">{{ announcement.announcementName }}</span><span>[{{ announcement.announcementTime }}]</span>
        </li>
      </ul>
      <!--公告-->
      <span id="bottomSpan"></span>
      <!--制造边框-->
      <p id="detail"><a href="#/eduAdmin/information/noticeManage">详情</a></p>
    </div>
    <Back-top :height="100" :bottom="50"></Back-top>
    <Modal
        v-model="modal"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal = false">确定</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'eduAdminHomeDiv',
    data () {
      return {
        baseSettingImg: require("./images/基本设置.png"),
        gradeManageImg: require("./images/成绩管理.png"),
        manageImg: require("./images/教务审批.png"),
        eduAdminManageImg: require("./images/考务管理.png"),
        emolumentImg: require("./images/课酬管理.png"),
        informationImg: require("./images/教务公告.png"),
        courseImg: require("./images/智能排课.png"),
        roleImg: require("./images/权限管理.png"),
        courseInfoImg: require("./images/课程信息.jpg"),
        directionImg: require("./images/督导管理.png"),
        courseMgmtImg: require("./images/课程管理.png"),
        personInfoImg: require("./images/个人信息.jpg"),
//        功能块图标地址
        inFunction: true,
        roleList: [
          /*{roleId: 3,roleName:"教务"},
          {roleId: 2,roleName:"教师"}*/
        ],
//        角色列表
        authorityList: [],
//        权限id列表
        authorityModels: [],
//        一级功能列表
        activeName: "",
//        选中角色绑定
        announcementList: [
          /*{
            "announcementId": 1,
            "announcementName": " 关于xxx 的公告11111111111111111111111111111111",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "部门分布"
          },
          {
            "announcementId": 2,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-18",
            "announcementType": "部门分布"
          },
          {
            "announcementId": 3,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-16",
            "announcementType": "学院公告"
          },
          {
            "announcementId": 4,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-20",
            "announcementType": "学院公告"
          },
          {
            "announcementId": 5,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-4",
            "announcementType": "校务公布"
          },
          {
            "announcementId": 6,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-3",
            "announcementType": "校务公布"
          },
          {
            "announcementId": 7,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-4-29",
            "announcementType": "教务文件"
          },
          {
            "announcementId": 8,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-4-19",
            "announcementType": "教务文件"
          },
          {
            "announcementId": 9,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-12",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 10,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-12",
            "announcementType": "科研动态"
          },
          {
            "announcementId": 11,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 11,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 12,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 13,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 14,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 15,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 16,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          },
          {
            "announcementId": 17,
            "announcementName": " 关于xxx 的公告",
            "announcementContent": "sss",
            "announcementTime": "2015-5-19",
            "announcementType": "对外播报"
          }*/
        ],
//        公告信息
        isEduAdmin: false,
//        时间设置功能按钮显隐
        modal: false,
        modal1: false,
        modal2: false,
        modal3: false,
//        对话框显隐
        errorMessage: "",
//        对话框内容
        firstDate: "",
//        第一学期开始时间
        secondDate: "",
//        第二学期开始时间
        dateError: "",
//        学期设置失败回调
        evaluationDate: null,
//        评教起止时间
        gradeDate: null,
//        成绩录入起止时间
        latelyEvaTime: "",
//        最近的评教时间
        latelyGradeTime: "",
//        最近的成绩录入时间
      }
    },
    beforeMount: function() {
//    页面dom加载前获取后端数据
      this.$http.post('./announcementManage/getAllAnnouncement',{},{
//      this.$http.post('../testPhp/getAllAnnouncement.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        this.announcementList = response.body.announcementList;
        this.announcementList = this.announcementList.reverse();
        if(this.announcementList.length == 0){
          this.announcementList.push({
            "announcementId": "null",
            "announcementName": "……",
            "announcementContent": "null",
            "announcementTime": "",
            "announcementType": "null"
          })
        }
      },function(error){
        this.$Message.error('连接失败，请重试！');
        if(this.announcementList.length == 0){
          this.announcementList.push({
            "announcementId": "null",
            "announcementName": "……",
            "announcementContent": "null",
            "announcementTime": "…",
            "announcementType": "null"
          })
        }
      });
      this.$http.post('./getPermissionByUser',{},{
//      this.$http.post('../testPhp/getPermissionByUser.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        sessionStorage.setItem("authorityList", JSON.stringify(response.body.currentPermissionList));
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },

    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("eduAdminHomeDiv");
      dom.style.minHeight = window.innerHeight*0.92 + "px";

      this.$http.post('./getCurrentUser',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        for (var i = 0; i < response.body.currentRoleList.length; i++) {
          if(response.body.currentRoleList[i].roleId == 1){
            location.href = '#/login/main/studentHome';
          }
        }
        this.roleList = response.body.currentRoleList;
        this.$nextTick(function () {
          try {
            if(sessionStorage.getItem("lastClickRole") != null){
              this.roleChange(parseInt(sessionStorage.getItem("lastClickRole")));
            }else{
              this.roleChange(this.roleList[0].roleId);
            }
          }catch (e){}
        });
      },function(error){});
    },//获取角色列表，如果有最后一次点击纪录就点击对应角色，否则点击第一个角色
    watch:{
      activeName: function () {
//        监听角色选择绑定的变化，生成一级功能块
        if(this.activeName == 3){
          this.isEduAdmin = true;
        }else{
          this.isEduAdmin = false;
        }
        this.$http.post('./getRoleAuthority',{
          "roleId": this.activeName
        },{
//      this.$http.post('../testPhp/getRoleAuthority.php',{},{
          "Content-Type":"application/json"
        }).then(function(response){
          this.authorityList = response.body.getRoleAuthorityList.authorityIdList;
          this.authorityModels = [];
          for (var i = 0; i < this.authorityList.length; i++) {
//            生成功能块列表
            if(this.authorityList[i] == "17" || this.authorityList[i] == "12" || this.authorityList[i] == "13" || this.authorityList[i] == "11" || this.authorityList[i] == "8" || this.authorityList[i] == "62" || this.authorityList[i] == "30") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教务审批") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教务审批", msgNum:"0", index:1 });
              }
            }else if(this.authorityList[i] == "14" || this.authorityList[i] == "9" || this.authorityList[i] == "7") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "智能排课") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"智能排课", msgNum:"0", index:2 });
              }
            }else if(this.authorityList[i] == "19") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教务公告") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教务公告", msgNum:"0", index:3 });
              }
            }else if(this.authorityList[i] == "28" || this.authorityList[i] == "29" || this.authorityList[i] == "31" || this.authorityList[i] == "32") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "成绩管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"成绩管理", msgNum:"0", index:4 });
              }
            }else if(this.authorityList[i] == "34") {
              this.authorityModels.push({ name:"教务督导管理", msgNum:"0", index:5 });
            }else if(this.authorityList[i] == "10") {
              this.authorityModels.push({ name:"考务管理", msgNum:"0", index:6 });
            }else if(this.authorityList[i] == "5" || this.authorityList[i] == "66" || this.authorityList[i] == "22") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "课酬管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"课酬管理", msgNum:"0", index:7 });
              }
            }else if(this.authorityList[i] == "15" || this.authorityList[i] == "16") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "培养方案管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"培养方案管理", msgNum:"0", index:8 });
              }
            }else if(this.authorityList[i] == "24" || this.authorityList[i] == "23" || this.authorityList[i] == "26" || this.authorityList[i] == "64") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "人员管理设置") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"人员管理设置", msgNum:"0", index:9 });
              }
            }else if(this.authorityList[i] == "27" || this.authorityList[i] == "21" || this.authorityList[i] == "65" || this.authorityList[i] == "20") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "资源管理设置") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"资源管理设置", msgNum:"0", index:10 });
              }
            }else if(this.authorityList[i] == "6") {
              this.authorityModels.push({ name:"课表查询", msgNum:"0", index:11 });
            }else if(this.authorityList[i] == "1" || this.authorityList[i] == "2") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "权限管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"权限管理", msgNum:"0", index:12 });
              }
            }else if(this.authorityList[i] == "39" || this.authorityList[i] == "42" || this.authorityList[i] == "41" || this.authorityList[i] == "40" || this.authorityList[i] == "38") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "我的课程") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"我的课程", msgNum:"0", index:13 });
              }
            }else if(this.authorityList[i] == "37" || this.authorityList[i] == "36" || this.authorityList[i] == "67" || this.authorityList[i] == "63" || this.authorityList[i] == "25") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教学活动") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教学活动", msgNum:"0", index:14 });
              }
            }else if(this.authorityList[i] == "33") {
              this.authorityModels.push({ name:"成绩管理", msgNum:"0", index:15 });
            }else if(this.authorityList[i] == "35") {
              this.authorityModels.push({ name:"课酬管理", msgNum:"0", index:16 });
            }else if(this.authorityList[i] == "43") {
              this.authorityModels.push({ name:"个人信息", msgNum:"0", index:17 });
            }else if(this.authorityList[i] == "52") {
              this.authorityModels.push({ name:"督导反馈", msgNum:"0", index:18 });
            }else if(this.authorityList[i] == "54") {
              this.authorityModels.push({ name:"班级管理", msgNum:"0", index:19 });
            }else if(this.authorityList[i] == "56" || this.authorityList[i] == "55") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "组别管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"组别管理", msgNum:"0", index:20 });
              }
            }
          }
          var sortA = [];
          var sortB = [];
          for (var i = 0; i < this.authorityModels.length; i++) {
            sortA.push(this.authorityModels[i].index);
          }
          sortA = sortA .sort (function(a,b){return a-b});
          for (var i = 0; i < sortA.length; i++) {
            for (var j = 0; j < this.authorityModels.length; j++) {
              if(this.authorityModels[j].index == sortA[i]){
                sortB.push(JSON.parse(JSON.stringify(this.authorityModels[j])));
              }
            }
          }
          this.authorityModels = JSON.parse(JSON.stringify(sortB));
          this.$nextTick(function(){
            var img = document.getElementById("topFuncDiv").getElementsByTagName("img");
            for (var i = 0; i < img.length; i++) {
              if (img[i].alt == "人员管理设置" || img[i].alt == "资源管理设置") {
                img[i].src = this.baseSettingImg;
              } else if (img[i].alt == "成绩管理") {
                img[i].src = this.gradeManageImg;
              } else if (img[i].alt == "教务审批") {
                img[i].src = this.manageImg;
              } else if (img[i].alt == "考务管理") {
                img[i].src = this.eduAdminManageImg;
              } else if (img[i].alt == "课酬管理") {
                img[i].src = this.emolumentImg;
              } else if (img[i].alt == "教务公告") {
                img[i].src = this.informationImg;
              } else if (img[i].alt == "智能排课") {
                img[i].src = this.courseImg;
              } else if (img[i].alt == "权限管理") {
                img[i].src = this.roleImg;
              } else if (img[i].alt == "课表查询") {
                img[i].src = this.courseInfoImg;
              } else if (img[i].alt == "班级管理") {
                img[i].src = this.baseSettingImg;
              } else if (img[i].alt == "教务督导管理") {
                img[i].src = this.directionImg;
              } else if (img[i].alt == "课程管理") {
                img[i].src = this.courseMgmtImg;
              } else if (img[i].alt == "个人信息") {
                img[i].src = this.personInfoImg;
              } else{
//                img[i].src = this.baseSettingImg;
              }
            }
            this.$http.post('./getTipsNum',{},{
              "Content-Type":"application/json"
            }).then(function(response){
              for (var i = 0; i < this.authorityModels.length; i++) {
                if(this.authorityModels[i].name == "人员管理设置"){
                  this.authorityModels[i].msgNum = response.body.applyQuitStudentNum + response.body.applyDropStudentNum + response.body.applyReinstatingStudentNum;
                }else if(this.authorityModels[i].name == "教务审批"){
                  this.authorityModels[i].msgNum = response.body.makeUpAskNum + response.body.teacherApplyNumber;
                }else if(this.authorityModels[i].name == "督导反馈"){
                  this.authorityModels[i].msgNum = response.body.noCheckSupNum;
                }
              }
            },function(error){
            });
          });
        },function(error){
          /*this.authorityList = [];
          for (var i = 0; i < 70; i++) {
            this.authorityList.push(i);
          }
          for (var i = 0; i < this.authorityList.length; i++) {
//            生成功能块列表
            if(this.authorityList[i] == "17" || this.authorityList[i] == "12" || this.authorityList[i] == "13" || this.authorityList[i] == "11" || this.authorityList[i] == "8" || this.authorityList[i] == "62" || this.authorityList[i] == "30") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教务审批") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教务审批", msgNum:"0", index:1 });
              }
            }else if(this.authorityList[i] == "14" || this.authorityList[i] == "9" || this.authorityList[i] == "7") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "智能排课") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"智能排课", msgNum:"0", index:2 });
              }
            }else if(this.authorityList[i] == "19") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教务公告") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教务公告", msgNum:"0", index:3 });
              }
            }else if(this.authorityList[i] == "28" || this.authorityList[i] == "29" || this.authorityList[i] == "31" || this.authorityList[i] == "32") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "成绩管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"成绩管理", msgNum:"0", index:4 });
              }
            }else if(this.authorityList[i] == "34") {
              this.authorityModels.push({ name:"教务督导管理", msgNum:"0", index:5 });
            }else if(this.authorityList[i] == "10") {
              this.authorityModels.push({ name:"考务管理", msgNum:"0", index:6 });
            }else if(this.authorityList[i] == "5" || this.authorityList[i] == "66" || this.authorityList[i] == "22") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "课酬管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"课酬管理", msgNum:"0", index:7 });
              }
            }else if(this.authorityList[i] == "15" || this.authorityList[i] == "16") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "培养方案管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"培养方案管理", msgNum:"0", index:8 });
              }
            }else if(this.authorityList[i] == "24" || this.authorityList[i] == "23" || this.authorityList[i] == "26" || this.authorityList[i] == "64") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "人员管理设置") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"人员管理设置", msgNum:"0", index:9 });
              }
            }else if(this.authorityList[i] == "27" || this.authorityList[i] == "21" || this.authorityList[i] == "65" || this.authorityList[i] == "20") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "资源管理设置") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"资源管理设置", msgNum:"0", index:10 });
              }
            }else if(this.authorityList[i] == "6") {
              this.authorityModels.push({ name:"课表查询", msgNum:"0", index:11 });
            }else if(this.authorityList[i] == "1" || this.authorityList[i] == "2") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "权限管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"权限管理", msgNum:"0", index:12 });
              }
            }else if(this.authorityList[i] == "39" || this.authorityList[i] == "42" || this.authorityList[i] == "41" || this.authorityList[i] == "40" || this.authorityList[i] == "38") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "我的课程") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"我的课程", msgNum:"0", index:13 });
              }
            }else if(this.authorityList[i] == "37" || this.authorityList[i] == "36" || this.authorityList[i] == "67" || this.authorityList[i] == "63" || this.authorityList[i] == "25") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "教学活动") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"教学活动", msgNum:"0", index:14 });
              }
            }else if(this.authorityList[i] == "33") {
              this.authorityModels.push({ name:"成绩管理", msgNum:"0", index:15 });
            }else if(this.authorityList[i] == "35") {
              this.authorityModels.push({ name:"课酬管理", msgNum:"0", index:16 });
            }else if(this.authorityList[i] == "43") {
              this.authorityModels.push({ name:"个人信息", msgNum:"0", index:17 });
            }else if(this.authorityList[i] == "52") {
              this.authorityModels.push({ name:"督导反馈", msgNum:"0", index:18 });
            }else if(this.authorityList[i] == "54") {
              this.authorityModels.push({ name:"班级管理", msgNum:"0", index:19 });
            }else if(this.authorityList[i] == "56" || this.authorityList[i] == "55") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a].name == "组别管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push({ name:"组别管理", msgNum:"0", index:20 });
              }
            }
          }
          var sortA = [];
          var sortB = [];
          for (var i = 0; i < this.authorityModels.length; i++) {
            sortA.push(this.authorityModels[i].index);
          }
          sortA = sortA .sort (function(a,b){return a-b});
          for (var i = 0; i < sortA.length; i++) {
            for (var j = 0; j < this.authorityModels.length; j++) {
              if(this.authorityModels[j].index == sortA[i]){
                sortB.push(JSON.parse(JSON.stringify(this.authorityModels[j])));
              }
            }
          }
          this.authorityModels = JSON.parse(JSON.stringify(sortB));
          this.$nextTick(function(){
            var img = document.getElementById("topFuncDiv").getElementsByTagName("img");
            for (var i = 0; i < img.length; i++) {
              if (img[i].alt == "人员管理设置" || img[i].alt == "资源管理设置") {
                img[i].src = this.baseSettingImg;
              } else if (img[i].alt == "成绩管理") {
                img[i].src = this.gradeManageImg;
              } else if (img[i].alt == "教务审批") {
                img[i].src = this.manageImg;
              } else if (img[i].alt == "考务管理") {
                img[i].src = this.eduAdminManageImg;
              } else if (img[i].alt == "课酬管理") {
                img[i].src = this.emolumentImg;
              } else if (img[i].alt == "教务公告") {
                img[i].src = this.informationImg;
              } else if (img[i].alt == "智能排课") {
                img[i].src = this.courseImg;
              } else if (img[i].alt == "权限管理") {
                img[i].src = this.roleImg;
              } else if (img[i].alt == "课表查询") {
                img[i].src = this.courseInfoImg;
              } else if (img[i].alt == "班级管理") {
                img[i].src = this.baseSettingImg;
              } else if (img[i].alt == "教务督导管理") {
                img[i].src = this.directionImg;
              } else if (img[i].alt == "课程管理") {
                img[i].src = this.courseMgmtImg;
              } else if (img[i].alt == "个人信息") {
                img[i].src = this.personInfoImg;
              } else{
//                img[i].src = this.baseSettingImg;
              }
            }
          });*/
        });
        sessionStorage.setItem("lastClickRole", this.activeName);
//        记录最后一次点击角色
      },
      modal2: function () {
        if(this.modal2){
          this.$http.post('./getEvaTime',{},{
            "Content-Type":"application/json"
          }).then(function(response){
            if(response.body.result == "1") {
              this.latelyEvaTime = "最近的评教时间为：" + response.body.evaTime.startEvaTeachTime + "到" + response.body.evaTime.endEvaTeachTime;
            }else if(response.body.result == "0") {
              this.latelyEvaTime = "";
            }
          },function(error){
          });
        }
      },
      modal3: function () {
        if(this.modal3){
          this.$http.post('./getScoreInputTime',{},{
            "Content-Type":"application/json"
          }).then(function(response){
            if(response.body.result == "1") {
              this.latelyGradeTime = "最近的成绩录入时间为：" + response.body.scoreInputTime.startScoreInputTime + "到" + response.body.scoreInputTime.endScoreInputTime;
            }else if(response.body.result == "0") {
              this.latelyGradeTime = "";
            }
          },function(error){
          });
        }
      },
    },
    methods:{
      termStart: function () {
        var firstDate = new Date(this.firstDate);
        var secondDate = new Date(this.secondDate);
        if(this.firstDate == "" || this.secondDate == ""){
          this.errorMessage = "时间不能为空,请重试!";
          this.modal = true;
        }else if(firstDate >= secondDate){
          this.errorMessage = "第一学期开始时间必须早于第二学期，请重试！";
          this.modal = true;
        }else if((secondDate - firstDate) / (1000 * 3600 * 24) < 120){
          this.errorMessage = "学期间隔时间太短，请重试！";
          this.modal = true;
        }else {
          this.dateError = "";
          var firstYear = firstDate.getFullYear() + "-" + (firstDate.getFullYear() + 1) + ".1";
          this.$http.post('./setSchoolStartTime', {
            "startYearSemester": firstYear,
            "startTime": firstDate
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal1 = false;
            if (res.body.result == "1") {
              this.$Message.success('学期开始时间设置成功！');
            } else {
              this.dateError += res.body.result + "，请重试！";
              this.errorMessage = this.dateError;
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！');
          });

          var secondYear = (secondDate.getFullYear() - 1) + "-" + secondDate.getFullYear() + ".2";
          this.$http.post('./setSchoolStartTime', {
            "startYearSemester": secondYear,
            "startTime": secondDate
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal1 = false;
            if (res.body.result == "1") {
              this.$Message.success('学期开始时间设置成功！');
            } else {
              this.dateError += res.body.result + "，请重试！";
              this.errorMessage = this.dateError;
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//学期开始时间设置
      evaluationStart: function () {
        console.log(this.evaluationDate);
        if(this.evaluationDate[0] == "" || this.evaluationDate[1] == ""){
          this.errorMessage = "时间区间不能为空,请重试!";
          this.modal = true;
        }else {
          this.$http.post('./setEvaTime', {
            "startEvaTeachTime": new Date(this.evaluationDate[0]),
            "endEvaTeachTime": new Date(this.evaluationDate[1])
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal2 = false;
            if (res.body.result == "1") {
              this.$Message.success('评教时间设置成功！');
            }else{
              this.errorMessage = res.body.result;
              this.modal = true;
            }
          }, function (error) {
            this.modal2 = false;
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//评教起止时间
      gradeStart: function () {
        if(this.gradeDate[0] == "" || this.gradeDate[1] == ""){
          this.errorMessage = "时间区间不能为空,请重试!";
          this.modal = true;
        }else {
          this.$http.post('./setScoreInputTime', {
            "startScoreInputTime": new Date(this.gradeDate[0]),
            "endScoreInputTime": new Date(this.gradeDate[1])
          }, {
            "Content-Type": "application/json"
          }).then(function (res) {
            this.modal3 = false;
            if (res.body.result == "1") {
              this.$Message.success('成绩录入时间设置成功！');
            }else{
              this.errorMessage = res.body.result;
              this.modal = true;
            }
          }, function (error) {
            this.$Message.error('连接失败，请重试！');
          });
        }
      },//成绩录入起止时间
      roleChange: function (name) {
//        角色选择触发绑定变化，触发中间功能块显隐
        this.inFunction = true;
        this.activeName = name;
        this.$nextTick(function () {
          this.$refs.roleMenu.updateActiveName();
        });
      },
      inFuncClick: function (index) {
//        点击功能模块进行跳转
        if(this.authorityModels[index].name == "教务审批"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "17"){
              location.href = "#/eduAdmin/examination/eduAdminTchTeachingPlan";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "12"){
              location.href = "#/eduAdmin/examination/adjustCouApply";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "13"){
              location.href = "#/eduAdmin/examination/makeupCouApply";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "11"){
              location.href = "#/eduAdmin/examination/suspendCouApply";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "8"){
              location.href = "#/eduAdmin/examination/banCouApply";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "62"){
              location.href = "#/eduAdmin/examination/eduAdminEvaTeachingResult";
              return;
            }
          }for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "30"){
              location.href = "#/eduAdmin/examination/makeupExamAdmin";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "智能排课"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "14"){
              location.href = "#/eduAdmin/course/couArrangeSetting";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "9"){
              location.href = "#/eduAdmin/course/combineCourse";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "7"){
              location.href = "#/eduAdmin/course/couArrangeTable";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "教务公告"){
          location.href = "#/eduAdmin/information/noticeManage";
        }else if(this.authorityModels[index].name == "成绩管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "28"){
              location.href = "#/eduAdmin/gradeManage/gradeStat";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "29"){
              location.href = "#/eduAdmin/gradeManage/gradeQuery";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "31"){
              location.href = "#/eduAdmin/gradeManage/adminCancelGrade";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "32"){
              location.href = "#/eduAdmin/gradeManage/makeupGradeInput";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "教务督导管理"){
          location.href = "#/eduAdmin/eduAdminSupervisorManage";
        }else if(this.authorityModels[index].name == "考务管理"){
          location.href = "#/eduAdmin/eduAdmin/eduAdminManage";
        }else if(this.authorityModels[index].name == "课酬管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "5"){
              location.href = "#/eduAdmin/emolument/salary";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "66"){
              location.href = "#/eduAdmin/emolument/seeSigninList";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "22"){
              location.href = "#/eduAdmin/emolument/setPrice";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "培养方案管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "15"){
              location.href = "#/eduAdmin/plan/eduAdminEduPlan";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "16"){
              location.href = "#/eduAdmin/plan/eduAdminTeachProcess";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "人员管理设置"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "24"){
              location.href = "#/eduAdmin/person/eduResGroupMgmt";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "23"){
              location.href = "#/eduAdmin/person/eduAdminManageStd";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "26"){
              location.href = "#/eduAdmin/person/eduAdminManageTch";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "64"){
              location.href = "#/eduAdmin/person/eduAdminManageClass";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "资源管理设置"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "27"){
              location.href = "#/eduAdmin/resource/textbookMgmt";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "21"){
              location.href = "#/eduAdmin/resource/eduAdminManageGrade";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "65"){
              location.href = "#/eduAdmin/resource/courseTypeMgmt";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "20"){
              location.href = "#/eduAdmin/resource/classroomMgmt";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "课表查询"){
          location.href = "#/eduAdmin/checkCourse";
        }else if(this.authorityModels[index].name == "权限管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "1"){
              location.href = "#/eduAdmin/role/authorityMgmt1";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "2"){
              location.href = "#/eduAdmin/role/eduAdminAuthorityManage2";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "我的课程"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "39"){
              location.href = "#/teacher/course/tchCheckTimetable";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "42"){
              location.href = "#/teacher/course/makeupClass";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "41"){
              location.href = "#/teacher/course/tchManuAdjCl";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "40"){
              location.href = "#/teacher/course/stopClass";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "38"){
              location.href = "#/teacher/course/requirement";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "教学活动"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "37"){
              location.href = "#/teacher/teach/normalSchedule";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "36"){
              location.href = "#/teacher/teach/courseList";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "67"){
              location.href = "#/teacher/teach/teacherDirector";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "63"){
              location.href = "#/teacher/teach/teachingEvaluate";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "25"){
              location.href = "#/teacher/teach/teacherTestInfo";
              return;
            }
          }
        }else if(this.authorityModels[index].name == "成绩管理"){
          location.href = "#/teacher/class/tchGradesInput";
        }else if(this.authorityModels[index].name == "课酬管理"){
          location.href = "#/teacher/classInfo/tchCheckSalary";
        }else if(this.authorityModels[index].name == "个人信息"){
          location.href = "#/teacher/personInfo/basicMessage";
        }else if(this.authorityModels[index].name == "督导反馈"){
          location.href = "#/teacher/director";
        }else if(this.authorityModels[index].name == "班级管理"){
          location.href = "#/teacher/classList";
        }else if(this.authorityModels[index].name == "组别管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "56"){
              location.href = "#/teacher/group/research";
              return;
            }
          }
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == "55"){
              location.href = "#/teacher/group/eduAdminTchTeachingPlan";
              return;
            }
          }
        }
      },
      announcementClick: function (id) {
//        公告点击跳转详情
        if(id != "null") {
          location.href = "#/eduAdmin/information/notifyInformation?" + id;
        }
      }
    }

  }
</script>

<style scoped>
  #eduAdminHomeDiv {
    background-color: white;
    display: flex;
    border: thin solid whitesmoke;
    border-top: thin solid #DCDCDC;
    overflow-x: hidden;
  }
  #menuDiv{
    /*左侧功能栏*/
    width: 13rem;
    min-width: 13rem;
    background-color: #EEF3FA;
    border: thin solid #EEF3FA;
  }
  #menu{
    background-color: transparent;
  }
  #termStartButton{
    /*学期开始时间设置按钮*/
    margin-top: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  #evaluationStartButton{
    /*评教起止时间设置按钮*/
    margin-top: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  #gradeStartButton{
    margin-top: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .ivu-menu-item-selected{
    /*角色被选中的背景色*/
    background-color: white;
  }
  #pageDiv{
    /*功能块区域*/
    width: 75%;
    height: 100%;
    padding: 1rem;
    display: flex;
    /*flex-direction: column;*/
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
  #topFuncDiv{
    /*一级功能块区域*/
    width: 95% ;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 1rem;
  }
  .modelImg{
    /*一级功能块图片*/
    font-weight: normal;
    font-size: 0.7rem;
    height: 5rem;
  }
  .pageSpan{
    /*功能块*/
    width: 20%;
    min-width: 5rem;
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    font-weight: bold;
    cursor: pointer;
    height: 7rem;
    margin: 1.5rem 2.5rem;
    background-color: transparent;
    text-align: center;
    border: thick solid #E9ECF2;
    border-image:-webkit-linear-gradient(-45deg, #A7C8D9,#B2E9D5) 30 30;
    border-image:-moz-linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    border-image:linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    box-shadow: 0.2rem 0.2rem 0.5rem 0.1rem grey;
  }
  .pageSpan li{
    font-weight: normal;
  }
  ul{
    margin: 0.5rem 0 0 0;
    padding: 0;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    cursor: pointer;
    color: red;
  }
  #functionDiv ul{
    /*三级功能列表*/
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }#functionDiv li{
     /*三级功能列表*/
     margin-left: 2rem;
   }
  #functionDiv div{
    /*二级功能块区域*/
    display: flex;
  }
  #functionDiv div div{
    /*二级功能块*/
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #functionDiv div:hover{
    color: red;
  }
  #functionDiv img{
    height: 5rem;
  }
  #backButtonDiv{
    /*返回一级功能块的按钮区域*/
    width:100%;
    text-align: center;
    margin-top: 2rem
  }
  .announcementName{
    /*公告*/
    width: 13.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  #announcementDiv{
    /*公告区域*/
    display: flex;
    width: 25rem;
    margin-top: 2rem;
    height: 28rem;
    position: relative;
    right: 1.5rem;
  }
  #topSpan:before {
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 15rem;
    bottom: 7.5rem;
    left: 5rem;
    background-color: #B2E9D5;
    display: block;
    transform: rotate(90deg);
  }
  #bottomSpan:before{
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 15rem;
    right: 4.8rem;
    top: 22.5rem;
    background-color: #B2E9D5;
    display: block;
    transform: rotate(90deg);
  }
  #announcementDiv:before {
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 8rem;
    bottom: 0.6rem;
    right: 0.8rem;
    background-color: #A7C8D9;
    display: block;
  }
  #announcementDiv:after {
    /*公告区域边框*/
    content: "";
    position: relative;
    width: 0.3rem;
    height: 8rem;
    left: 1rem;
    top: 22.6rem;
    background-color: #A7C8D9;
    display: block;
  }
  #nameUl{
    /*公告列表*/
    overflow-y: auto;
  }
  #nameUl li{
    line-height: 1.5rem;
    display: flex;
    font-size: 0.9rem;
  }
  #nameUl li span{
    display: inline-block;
  }
  #nameUl li:hover{
    text-decoration: underline;
    color: #0DA3E2;
    cursor: pointer;
  }
  #detail{
    /*详情点击*/
    position: absolute;
    top: 27rem;
    left: 15.5rem;
  }
  #detail:hover{
    cursor: pointer;
    color: red;
  }
  img{
    width: 5rem;
  }
  @media screen and (max-width: 1384px) {
    .announcementName{
      width: 10.5rem;
    }
  }
  @media screen and (min-width:320px) and (max-width:769px) {
    #menuDiv{
      min-width: 11rem;
    }
  }
</style>
