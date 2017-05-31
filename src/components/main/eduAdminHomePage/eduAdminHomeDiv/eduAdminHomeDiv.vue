<template>
  <div id="eduAdminHomeDiv">
    <div id="menuDiv">
      <Menu
          id="menu"
          :active-name="activeName"
          @on-select="roleChange"
          width="auto">
        <Menu-group title="角色类型">
          <Menu-item v-for="(role,index) in roleList" :name="role.roleId" :key="role.roleId" @click="roleChange">
            <!--<Icon type="document-text"></Icon>-->
            {{ role.roleName }}
          </Menu-item>
        </Menu-group>
      </Menu>
    </div>
    <!--iview的菜单组件-->
    <div id="pageDiv">
      <div v-if="!inFunction" id="functionDiv">
        <button id="backButton" class="am-btn am-btn-success am-radius" @click="inFunction = true">返回</button>
        <div v-for="(inFuncModel,index) in inFuncModels" @mouseover="imgOver(index)" @mouseout="imgOut(index)">
          <div>
            <img :id="'img'+index+'green'" :src="inFuncModel.greenImg" v-show="inFuncModel.greenOrBlue" >
            <img :id="'img'+index+'blue'" :src="inFuncModel.blueImg" v-show="!inFuncModel.greenOrBlue" >
            <br>
            {{ inFuncModel.name }}
          </div>
          <ul>
            <li v-for="pageModel in inFuncModel.pageModels"><a :href="pageModel.href">{{ pageModel.name }}</a></li>
          </ul>
        </div>
        <!--二级功能块-->
      </div>
      <div id="topFuncDiv" v-show="inFunction">
        <span class="pageSpan" v-for="(authorityModel,index) in authorityModels" @click="inFuncClick(index)">{{ authorityModel }}</span>
      </div>
      <!--一级功能块-->
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
  </div>
</template>

<script>
  export default {
    name: 'eduAdminHomeDiv',
    data () {
      return {
        inFunction: true,
        roleList: [
          /*{roleId:"3",roleName:"教务"},
          {roleId:"2",roleName:"教师"}*/
        ],
        firstEnter: true,
//        角色列表
        authorityList: [],
//        权限id列表
        functionModels: [],
//        权限名称列表
        authorityModels: [],
//        一级功能列表
        inFuncModels: [],
//        二级功能列表
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
        ]
//        公告信息
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
        this.roleList = response.body.currentRoleList;
        this.$nextTick(function () {
          try {
            var li = document.getElementById("menuDiv").getElementsByTagName("li");
            var ivuMenuItem = document.getElementsByClassName("ivu-menu-item");
            var thisURL = document.URL;
            if(thisURL.indexOf("?") >= 0) {
              var param = thisURL.split("?")[1];
              this.$http.post('./getRoleAuthority',{
                "roleId": 3
              },{
                "Content-Type":"application/json"
              }).then(function(response){
                this.authorityList = response.body.getRoleAuthorityList.authorityIdList;
                this.functionModels = [];
                this.authorityModels = [];
                for (var i = 0; i < this.authorityList.length; i++) {
//            生成权限名称列表
                  if(this.authorityList[i] == 28 || this.authorityList[i] == 29 || this.authorityList[i] == 32){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "成绩") {
                        isExist = true;
                      }
                    }
                    if(!isExist)
                      this.functionModels.push("成绩");
                  }else if(this.authorityList[i] == 30 || this.authorityList[i] == 31){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "补考") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("补考");
                    }
                  }else if(this.authorityList[i] == 20 || this.authorityList[i] == 21 || this.authorityList[i] == 27 || this.authorityList[i] == 65){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "资源管理设置") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("资源管理设置");
                    }
                  }else if(this.authorityList[i] == 23 || this.authorityList[i] == 24 || this.authorityList[i] == 26 || this.authorityList[i] == 64){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "人员管理设置") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("人员管理设置");
                    }
                  }else if(this.authorityList[i] == 15 || this.authorityList[i] == 16 || this.authorityList[i] == 34){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "教务安排") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("教务安排");
                    }
                  }else if(this.authorityList[i] == 17 || this.authorityList[i] == 62){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "教务审查") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("教务审查");
                    }
                  }else if(this.authorityList[i] == 10){
                    this.functionModels.push("考务管理");
                  }else if(this.authorityList[i] == 5 || this.authorityList[i] == 22){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "课酬模块") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("课酬模块");
                    }
                  }else if(this.authorityList[i] == 19){
                    this.functionModels.push("教务公告");
                  }else if(this.authorityList[i] == 7 || this.authorityList[i] == 8 || this.authorityList[i] == 9 || this.authorityList[i] == 14){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "排课操作") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("排课操作");
                    }
                  }else if(this.authorityList[i] == 6 || this.authorityList[i] == 11 || this.authorityList[i] == 12 || this.authorityList[i] == 13){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "排课信息") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("排课信息");
                    }
                  }else if(this.authorityList[i] == 1 || this.authorityList[i] == 2){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "权限管理") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("权限管理");
                    }
                  }else if(this.authorityList[i] == 55 || this.authorityList[i] == 56){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "组别管理") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("组别管理");
                    }
                  }else if(this.authorityList[i] == 38 || this.authorityList[i] == 40 || this.authorityList[i] == 41 || this.authorityList[i] == 42){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "课程管理") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("课程管理");
                    }
                  }else if(this.authorityList[i] == 36 || this.authorityList[i] == 52){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "教学管理") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("教学管理");
                    }
                  }else if(this.authorityList[i] == 33 || this.authorityList[i] == 63 || this.authorityList[i] == 54){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "班级管理") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("班级管理");
                    }
                  }else if(this.authorityList[i] == 25 || this.authorityList[i] == 35 || this.authorityList[i] == 39){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "课程信息维护") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("课程信息维护");
                    }
                  }else if(this.authorityList[i] == 43 || this.authorityList[i] == 44 || this.authorityList[i] == 45 || this.authorityList[i] == 46 || this.authorityList[i] == 59){
                    var isExist = false;
                    for (var a = 0; a < this.functionModels.length; a++) {
                      if(this.functionModels[a] == "个人信息维护") {
                        isExist = true;
                      }
                    }
                    if(!isExist){
                      this.functionModels.push("个人信息维护");
                    }
                  }
                }
                for (var i = 0; i < this.functionModels.length; i++) {
//            生成一级功能块列表
                  if(this.functionModels[i] == "成绩" || this.functionModels[i] == "补考") {
                    var isExist = false;
                    for (var a = 0; a < this.authorityModels.length; a++) {
                      if (this.authorityModels[a] == "成绩管理") {
                        isExist = true;
                      }
                    }
                    if (!isExist) {
                      this.authorityModels.push("成绩管理");
                    }
                  }else if(this.functionModels[i] == "资源管理设置" || this.functionModels[i] == "人员管理设置") {
                    var isExist = false;
                    for (var a = 0; a < this.authorityModels.length; a++) {
                      if (this.authorityModels[a] == "基本设置") {
                        isExist = true;
                      }
                    }
                    if (!isExist) {
                      this.authorityModels.push("基本设置");
                    }
                  }else if(this.functionModels[i] == "教务安排" || this.functionModels[i] == "教务审查") {
                    var isExist = false;
                    for (var a = 0; a < this.authorityModels.length; a++) {
                      if (this.authorityModels[a] == "教务管理") {
                        isExist = true;
                      }
                    }
                    if (!isExist) {
                      this.authorityModels.push("教务管理");
                    }
                  }else if(this.functionModels[i] == "考务管理") {
                    this.authorityModels.push("考务管理");
                  }else if(this.functionModels[i] == "课酬模块") {
                    this.authorityModels.push("课酬模块");
                  }else if(this.functionModels[i] == "教务公告") {
                    this.authorityModels.push("教务公告");
                  }else if(this.functionModels[i] == "排课操作" || this.functionModels[i] == "排课信息") {
                    var isExist = false;
                    for (var a = 0; a < this.authorityModels.length; a++) {
                      if (this.authorityModels[a] == "智能排课") {
                        isExist = true;
                      }
                    }
                    if (!isExist) {
                      this.authorityModels.push("智能排课");
                    }
                  }else if(this.functionModels[i] == "权限管理") {
                    this.authorityModels.push("权限管理");
                  }else if(this.functionModels[i] == "组别管理"){
                    this.authorityModels.push("组别管理");
                  }else if(this.functionModels[i] == "课程管理"){
                    this.authorityModels.push("课程管理");
                  }else if(this.functionModels[i] == "教学管理"){
                    this.authorityModels.push("教学管理");
                  }else if(this.functionModels[i] == "班级管理"){
                    this.authorityModels.push("班级管理");
                  }else if(this.functionModels[i] == "课程信息维护"){
                    this.authorityModels.push("课程信息维护");
                  }else if(this.functionModels[i] == "个人信息维护"){
                    this.authorityModels.push("个人信息维护");
                  }
                }
                this.inFunction = false;
                this.inFuncModels = [];
                this.$nextTick(function () {
                  if (param == "gradeManage") {
                    for (var i = 0; i < this.functionModels.length; i++) {
                      if (this.functionModels[i] == "成绩") {
                        this.inFuncModels.push({
                          name: "成绩",
                          greenImg: require("./images/成绩绿.png"),
                          blueImg: require("./images/成绩蓝.png"),
                          greenOrBlue: true,
                          pageModels: [{name: "成绩统计", href: "#/eduAdmin/gradeManage/grade/gradeStat"}, {
                            name: "成绩查询",
                            href: "#/eduAdmin/gradeManage/grade/gradeQuery"
                          }, {name: "成绩撤销", href: "#/eduAdmin/gradeManage/grade/adminCancelGrade"}]
                        });
                      } else if (this.functionModels[i] == "补考") {
                        this.inFuncModels.push({
                          name: "补考",
                          greenImg: require("./images/补考绿.png"),
                          blueImg: require("./images/补考蓝.png"),
                          greenOrBlue: true,
                          pageModels: [{
                            name: "补考成绩管理",
                            href: "#/eduAdmin/gradeManage/makeupExam/makeupExamAdmin"
                          }, {name: "补考成绩输入", href: "#/eduAdmin/gradeManage/makeupExam/makeupGradeInput"}]
                        });
                      }
                    }
                  } else if (param == "baseSetting") {
                    for (var i = 0; i < this.functionModels.length; i++) {
                      if(this.functionModels[i] == "资源管理设置"){
                        this.inFuncModels.push({ name:"资源管理设置", greenImg:require("./images/资源管理设置绿.png"), blueImg:require("./images/资源管理设置蓝.png"), greenOrBlue:true, pageModels:[{ name:"教材管理", href:"#/eduAdmin/baseSetting/resource/textbookMgmt" }, { name:"年级管理", href:"#/eduAdmin/baseSetting/resource/eduAdminManageGrade" }, { name:"课程类型管理", href:"#/eduAdmin/baseSetting/resource/courseTypeMgmt" }, { name:"教室管理", href:"#/eduAdmin/baseSetting/resource/classroomMgmt" }] });
                      }else if(this.functionModels[i] == "人员管理设置"){
                        this.inFuncModels.push({ name:"人员管理设置", greenImg:require("./images/人员管理设置绿.png"), blueImg:require("./images/人员管理设置蓝.png"), greenOrBlue:true, pageModels:[{ name:"教研组管理", href:"#/eduAdmin/baseSetting/person/eduResGroupMgmt"}, { name:"学生管理", href:"#/eduAdmin/baseSetting/person/eduAdminManageStd" }, { name:"教师管理", href:"#/eduAdmin/baseSetting/person/eduAdminManageTch" }, { name:"学生异动情况", href:"#/eduAdmin/baseSetting/person/eduAdminManageClass" }] });
                      }
                    }
                  } else if (param == "manage") {
                    for (var i = 0; i < this.functionModels.length; i++) {
                      if (this.functionModels[i] == "教务安排") {
                        this.inFuncModels.push({
                          name: "教务安排",
                          greenImg: require("./images/教务安排绿.png"),
                          blueImg: require("./images/教务安排蓝.png"),
                          greenOrBlue: true,
                          pageModels: [{name: "培养方案", href: "#/eduAdmin/manage/plan/eduAdminEduPlan"}, {
                            name: "教学进度",
                            href: "#/eduAdmin/manage/plan/eduAdminTeachProcess"
                          }, {name: "教务管理督导", href: "#/eduAdmin/manage/plan/eduAdminSupervisorManage"}]
                        });
                      } else if (this.functionModels[i] == "教务审查") {
                        this.inFuncModels.push({
                          name: "教务审查",
                          greenImg: require("./images/教务审查绿.png"),
                          blueImg: require("./images/教务审查蓝.png"),
                          greenOrBlue: true,
                          pageModels: [{
                            name: "教学计划",
                            href: "#/eduAdmin/manage/examination/eduAdminTchTeachingPlan"
                          }, {name: "教务查看评教", href: "#/eduAdmin/manage/examination/eduAdminEvaTeachingResult"}]
                        });
                      }
                    }
                  } else if (param == "course") {
                    for (var i = 0; i < this.functionModels.length; i++) {
                      if (this.functionModels[i] == "排课操作") {
                        this.inFuncModels.push({
                          name: "排课操作",
                          greenImg: require("./images/排课操作绿.png"),
                          blueImg: require("./images/排课操作蓝.png"),
                          greenOrBlue: true,
                          pageModels: [{
                            name: "排课课程设置",
                            href: "#/eduAdmin/course/courseOperation/couArrangeSetting"
                          }, {name: "查看禁排申请", href: "#/eduAdmin/course/courseOperation/banCouApply"}, {
                            name: "合课设置",
                            href: "#/eduAdmin/course/courseOperation/combineCourse"
                          }, {name: "排课结果课表", href: "#/eduAdmin/course/courseOperation/couArrangeTable"}]
                        });
                      } else if (this.functionModels[i] == "排课信息") {
                        this.inFuncModels.push({
                          name: "排课信息",
                          greenImg: require("./images/排课信息绿.png"),
                          blueImg: require("./images/排课信息蓝.png"),
                          greenOrBlue: true,
                          pageModels: [{name: "查看课表", href: "#/eduAdmin/course/courseInfo/checkCourse"}, {
                            name: "查看调课申请",
                            href: "#/eduAdmin/course/courseInfo/adjustCouApply"
                          }, {name: "查看补课申请", href: "#/eduAdmin/course/courseInfo/makeupCouApply"}, {
                            name: "查看停课申请",
                            href: "#/eduAdmin/course/courseInfo/suspendCouApply"
                          }]
                        });
                      }
                    }
                  }
                });
              },function(error){
              });
            }else{
              li[1].click();
              ivuMenuItem[0].className += " ivu-menu-item-active ivu-menu-item-selected";
            }
          }catch (e){
          }
        });
        this.roleChange(this.roleList[0].roleId);
      },function(error){
        this.$Message.error('连接失败，请重试！',3);
      });
    },
    watch:{
      activeName: function () {
//        监听角色选择绑定的变化，生成一级功能块
        var ivuMenuItem = document.getElementsByClassName("ivu-menu-item ivu-menu-item-active ivu-menu-item-selected");
        if(this.firstEnter){
          this.firstEnter = false;
          ivuMenuItem[0].className = "ivu-menu-item";
        }
        this.$http.post('./getRoleAuthority',{
          "roleId": this.activeName
        },{
//      this.$http.post('../testPhp/getRoleAuthority.php',{},{
          "Content-Type":"application/json"
        }).then(function(response){
          this.authorityList = response.body.getRoleAuthorityList.authorityIdList;
          this.functionModels = [];
          this.authorityModels = [];
          for (var i = 0; i < this.authorityList.length; i++) {
//            生成权限名称列表
            if(this.authorityList[i] == 28 || this.authorityList[i] == 29 || this.authorityList[i] == 32){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "成绩") {
                  isExist = true;
                }
              }
              if(!isExist)
                this.functionModels.push("成绩");
            }else if(this.authorityList[i] == 30 || this.authorityList[i] == 31){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "补考") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("补考");
              }
            }else if(this.authorityList[i] == 20 || this.authorityList[i] == 21 || this.authorityList[i] == 27 || this.authorityList[i] == 65){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "资源管理设置") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("资源管理设置");
              }
            }else if(this.authorityList[i] == 23 || this.authorityList[i] == 24 || this.authorityList[i] == 26 || this.authorityList[i] == 64){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "人员管理设置") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("人员管理设置");
              }
            }else if(this.authorityList[i] == 15 || this.authorityList[i] == 16 || this.authorityList[i] == 34){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "教务安排") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("教务安排");
              }
            }else if(this.authorityList[i] == 17 || this.authorityList[i] == 62){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "教务审查") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("教务审查");
              }
            }else if(this.authorityList[i] == 10){
              this.functionModels.push("考务管理");
            }else if(this.authorityList[i] == 5 || this.authorityList[i] == 22){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "课酬模块") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("课酬模块");
              }
            }else if(this.authorityList[i] == 19){
              this.functionModels.push("教务公告");
            }else if(this.authorityList[i] == 7 || this.authorityList[i] == 8 || this.authorityList[i] == 9 || this.authorityList[i] == 14){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "排课操作") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("排课操作");
              }
            }else if(this.authorityList[i] == 6 || this.authorityList[i] == 11 || this.authorityList[i] == 12 || this.authorityList[i] == 13){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "排课信息") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("排课信息");
              }
            }else if(this.authorityList[i] == 1 || this.authorityList[i] == 2){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "权限管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("权限管理");
              }
            }else if(this.authorityList[i] == 55 || this.authorityList[i] == 56){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "组别管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("组别管理");
              }
            }else if(this.authorityList[i] == 38 || this.authorityList[i] == 40 || this.authorityList[i] == 41 || this.authorityList[i] == 42){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "课程管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("课程管理");
              }
            }else if(this.authorityList[i] == 36 || this.authorityList[i] == 52){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "教学管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("教学管理");
              }
            }else if(this.authorityList[i] == 33 || this.authorityList[i] == 63 || this.authorityList[i] == 54){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "班级管理") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("班级管理");
              }
            }else if(this.authorityList[i] == 25 || this.authorityList[i] == 35 || this.authorityList[i] == 39){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "课程信息维护") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("课程信息维护");
              }
            }else if(this.authorityList[i] == 43 || this.authorityList[i] == 44 || this.authorityList[i] == 45 || this.authorityList[i] == 46 || this.authorityList[i] == 59){
              var isExist = false;
              for (var a = 0; a < this.functionModels.length; a++) {
                if(this.functionModels[a] == "个人信息维护") {
                  isExist = true;
                }
              }
              if(!isExist){
                this.functionModels.push("个人信息维护");
              }
            }
          }
          for (var i = 0; i < this.functionModels.length; i++) {
//            生成一级功能块列表
            if(this.functionModels[i] == "成绩" || this.functionModels[i] == "补考") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a] == "成绩管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push("成绩管理");
              }
            }else if(this.functionModels[i] == "资源管理设置" || this.functionModels[i] == "人员管理设置") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a] == "基本设置") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push("基本设置");
              }
            }else if(this.functionModels[i] == "教务安排" || this.functionModels[i] == "教务审查") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a] == "教务管理") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push("教务管理");
              }
            }else if(this.functionModels[i] == "考务管理") {
              this.authorityModels.push("考务管理");
            }else if(this.functionModels[i] == "课酬模块") {
              this.authorityModels.push("课酬模块");
            }else if(this.functionModels[i] == "教务公告") {
              this.authorityModels.push("教务公告");
            }else if(this.functionModels[i] == "排课操作" || this.functionModels[i] == "排课信息") {
              var isExist = false;
              for (var a = 0; a < this.authorityModels.length; a++) {
                if (this.authorityModels[a] == "智能排课") {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.authorityModels.push("智能排课");
              }
            }else if(this.functionModels[i] == "权限管理") {
              this.authorityModels.push("权限管理");
            }else if(this.functionModels[i] == "组别管理"){
              this.authorityModels.push("组别管理");
            }else if(this.functionModels[i] == "课程管理"){
              this.authorityModels.push("课程管理");
            }else if(this.functionModels[i] == "教学管理"){
              this.authorityModels.push("教学管理");
            }else if(this.functionModels[i] == "班级管理"){
              this.authorityModels.push("班级管理");
            }else if(this.functionModels[i] == "课程信息维护"){
              this.authorityModels.push("课程信息维护");
            }else if(this.functionModels[i] == "个人信息维护"){
              this.authorityModels.push("个人信息维护");
            }
          }
        },function(error){
//          this.$Message.error('连接失败，请重试！');
//          this.authorityModels = [];
//          this.functionModels = [];
        });
      }
    },
    methods:{
      roleChange: function (name) {
//        角色选择触发绑定变化，触发中间功能块显隐
        this.inFunction = true;
        this.activeName = name;

      },
      inFuncClick: function (index) {
//        点击二级功能块显隐，生成二级、三级功能块
        this.inFunction = false;
        this.inFuncModels = [];
        if(this.authorityModels[index] == "成绩管理"){
          for (var i = 0; i < this.functionModels.length; i++) {
            if(this.functionModels[i] == "成绩"){
              this.inFuncModels.push({ name:"成绩", greenImg:require("./images/成绩绿.png"), blueImg:require("./images/成绩蓝.png"), greenOrBlue:true, pageModels:[{ name:"成绩统计", href:"#/eduAdmin/gradeManage/grade/gradeStat" }, { name:"成绩查询", href:"#/eduAdmin/gradeManage/grade/gradeQuery" }, { name:"成绩撤销", href:"#/eduAdmin/gradeManage/grade/adminCancelGrade" }] });
            }else if(this.functionModels[i] == "补考"){
              this.inFuncModels.push({ name:"补考", greenImg:require("./images/补考绿.png"), blueImg:require("./images/补考蓝.png"), greenOrBlue:true, pageModels:[{ name:"补考成绩管理", href:"#/eduAdmin/gradeManage/makeupExam/makeupExamAdmin"}, { name:"补考成绩输入", href:"#/eduAdmin/gradeManage/makeupExam/makeupGradeInput" }] });
            }
          }
        }else if(this.authorityModels[index] == "基本设置"){
          for (var i = 0; i < this.functionModels.length; i++) {
            if(this.functionModels[i] == "资源管理设置"){
              this.inFuncModels.push({ name:"资源管理设置", greenImg:require("./images/资源管理设置绿.png"), blueImg:require("./images/资源管理设置蓝.png"), greenOrBlue:true, pageModels:[{ name:"教材管理", href:"#/eduAdmin/baseSetting/resource/textbookMgmt" }, { name:"年级管理", href:"#/eduAdmin/baseSetting/resource/eduAdminManageGrade" }, { name:"课程类型管理", href:"#/eduAdmin/baseSetting/resource/courseTypeMgmt" }, { name:"教室管理", href:"#/eduAdmin/baseSetting/resource/classroomMgmt" }] });
            }else if(this.functionModels[i] == "人员管理设置"){
              this.inFuncModels.push({ name:"人员管理设置", greenImg:require("./images/人员管理设置绿.png"), blueImg:require("./images/人员管理设置蓝.png"), greenOrBlue:true, pageModels:[{ name:"教研组管理", href:"#/eduAdmin/baseSetting/person/eduResGroupMgmt"}, { name:"学生管理", href:"#/eduAdmin/baseSetting/person/eduAdminManageStd" }, { name:"教师管理", href:"#/eduAdmin/baseSetting/person/eduAdminManageTch" }, { name:"学生异动情况", href:"#/eduAdmin/baseSetting/person/eduAdminManageClass" }] });
            }
          }
        }else if(this.authorityModels[index] == "教务管理"){
          for (var i = 0; i < this.functionModels.length; i++) {
            if(this.functionModels[i] == "教务安排"){
              this.inFuncModels.push({ name:"教务安排", greenImg:require("./images/教务安排绿.png"), blueImg:require("./images/教务安排蓝.png"), greenOrBlue:true, pageModels:[{ name:"培养方案", href:"#/eduAdmin/manage/plan/eduAdminEduPlan" }, { name:"教学进度", href:"#/eduAdmin/manage/plan/eduAdminTeachProcess" }, { name:"教务管理督导", href:"#/eduAdmin/manage/plan/eduAdminSupervisorManage" }] });
            }else if(this.functionModels[i] == "教务审查"){
              this.inFuncModels.push({ name:"教务审查", greenImg:require("./images/教务审查绿.png"), blueImg:require("./images/教务审查蓝.png"), greenOrBlue:true, pageModels:[{ name:"教学计划", href:"#/eduAdmin/manage/examination/eduAdminTchTeachingPlan"}, { name:"教务查看评教", href:"#/eduAdmin/manage/examination/eduAdminEvaTeachingResult" }] });
            }
          }
        }else if(this.authorityModels[index] == "考务管理"){
          location.href = "#/eduAdmin/eduAdminManage";
        }else if(this.authorityModels[index] == "课酬模块"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 22){
              location.href = "#/eduAdmin/emolument/setPrice";
              break;
            }else if(this.authorityList[i] == 5){
              location.href = "#/eduAdmin/emolument/salary";
              break;
            }
          }
        }else if(this.authorityModels[index] == "教务公告"){
          location.href = "#/eduAdmin/information/noticeManage";
        }else if(this.authorityModels[index] == "智能排课"){
          for (var i = 0; i < this.functionModels.length; i++) {
            if(this.functionModels[i] == "排课操作"){
              this.inFuncModels.push({ name:"排课操作", greenImg:require("./images/排课操作绿.png"), blueImg:require("./images/排课操作蓝.png"), greenOrBlue:true, pageModels:[{ name:"排课课程设置", href:"#/eduAdmin/course/courseOperation/couArrangeSetting" }, { name:"查看禁排申请", href:"#/eduAdmin/course/courseOperation/banCouApply" }, { name:"合课设置", href:"#/eduAdmin/course/courseOperation/combineCourse" }, { name:"排课结果课表", href:"#/eduAdmin/course/courseOperation/couArrangeTable" }] });
            }else if(this.functionModels[i] == "排课信息"){
              this.inFuncModels.push({ name:"排课信息", greenImg:require("./images/排课信息绿.png"), blueImg:require("./images/排课信息蓝.png"), greenOrBlue:true, pageModels:[{ name:"查看课表", href:"#/eduAdmin/course/courseInfo/checkCourse"}, { name:"查看调课申请", href:"#/eduAdmin/course/courseInfo/adjustCouApply" }, { name:"查看补课申请", href:"#/eduAdmin/course/courseInfo/makeupCouApply" }, { name:"查看停课申请", href:"#/eduAdmin/course/courseInfo/suspendCouApply" }] });
            }
          }
        }else if(this.authorityModels[index] == "权限管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 1){
              location.href = "#/eduAdmin/role/authorityMgmt1";
              break;
            }else if(this.authorityList[i] == 2){
              location.href = "#/eduAdmin/role/eduAdminAuthorityManage2";
              break;
            }
          }
        }else if(this.authorityModels[index] == "组别管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 55){
              location.href = "#/teacher/group/research";
              break;
            }else if(this.authorityList[i] == 56){
              location.href = "#/teacher/group/eduAdminTchTeachingPlan";
              break;
            }
          }
        }else if(this.authorityModels[index] == "课程管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 41){
              location.href = "#/teacher/course/makeupClass";
              break;
            }else if(this.authorityList[i] == 40){
              location.href = "#/teacher/course/tchManuAdjCl";
              break;
            }else if(this.authorityList[i] == 39){
              location.href = "#/teacher/course/stopClass";
              break;
            }else if(this.authorityList[i] == 38){
              location.href = "#/teacher/course/requirement";
              break;
            }
          }
        }else if(this.authorityModels[index] == "教学管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 36){
              location.href = "#/teacher/teach/courseList";
              break;
            }else if(this.authorityList[i] == 52){
              location.href = "#/teacher/teach/director";
              break;
            }
          }
        }else if(this.authorityModels[index] == "班级管理"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 54){
              location.href = "#/teacher/class/classList";
              break;
            }else if(this.authorityList[i] == 63){
              location.href = "#/teacher/class/teachingEvaluate";
              break;
            }else if(this.authorityList[i] == 33){
              location.href = "#/teacher/class/tchGradesInput";
              break;
            }
          }
        }else if(this.authorityModels[index] == "课程信息维护"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 39){
              location.href = "#/teacher/classInfo/tchCheckTimetable";
              break;
            }else if(this.authorityList[i] == 25){
              location.href = "#/teacher/classInfo/teacherTestInfo";
              break;
            }else if(this.authorityList[i] == 35){
              location.href = "#/teacher/classInfo/tchCheckSalary";
              break;
            }
          }
        }else if(this.authorityModels[index] == "个人信息维护"){
          for (var i = 0; i < this.authorityList.length; i++) {
            if(this.authorityList[i] == 43){
              location.href = "#/teacher/personInfo/basicMessage";
              break;
            }else if(this.authorityList[i] == 59){
              location.href = "#/teacher/personInfo/passwdChange";
              break;
            }else if(this.authorityList[i] == 46){
              location.href = "#/teacher/info/certificateManege";
              break;
            }else if(this.authorityList[i] == 44){
              location.href = "#/teacher/info/educationManege";
              break;
            }else if(this.authorityList[i] == 45){
              location.href = "#/teacher/info/experience";
              break;
            }
          }
        }
      },
      imgOver: function (index){
//        鼠标滑上切换图片
        this.inFuncModels[index].greenOrBlue = false;
      },
      imgOut: function (index){
//        鼠标滑出切换图片
        this.inFuncModels[index].greenOrBlue = true;
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
    background-color: #EEF3FA;
    border: thin solid #EEF3FA;
  }
  #menu{
    background-color: transparent;
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
  }
  #topFuncDiv{
    /*一级功能块区域*/
    width: 95% ;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
  }
  .pageSpan{
    /*功能块*/
    width: 20%;
    font-weight: bold;
    line-height: 6.5rem;
    cursor: pointer;
    border: thick solid #E9ECF2;
    /*width: 10rem;*/
    height: 7.5rem;
    margin: 0.7rem 2.5rem;
    background-color: transparent;
    text-align: center;
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
  #functionDiv{
    /*二级三级功能块区域*/
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 2rem;
    height: 35rem;
  }
  #functionDiv ul{
    /*三级功能列表*/
    margin-top: 3rem;
  }
  #functionDiv li{
    margin-top: 2rem;
    font-size: 1.2rem;
  }
  #functionDiv div div{
    /*二级功能块*/
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #functionDiv div:hover{
    color: red;
  }
  #backButton{
    /*返回一级功能块按钮*/
    position: absolute;
    top:70%
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
    left: 18rem;
  }
  #detail:hover{
    cursor: pointer;
    color: red;
  }
  img{
    width: 5rem;
  }
  @media screen and (max-width: 1301px) {
    #detail{
      /*详情点击*/
      left: 15rem;
    }
  }
</style>
