<template>
    <div style="padding: 0.6rem 5rem;background-color: #f3f3f3;margin-top: 5rem">
      <div id="" style="background-color: white">
        <table class="normalTable" style="table-layout: fixed;">
          <thead>
          <tr><th colspan="7" style="font-size: 2rem;">页面链接测试</th></tr>
          </thead>
          <tbody>
          <tr>
            <td>教务基本设置模块</td>
            <td><router-link to="/eduAdmin/baseSetting/person/eduAdminManageStd">学生管理</router-link></td>
            <td><router-link to="/eduAdmin/baseSetting/person/eduAdminManageTch">教师管理</router-link></td>
            <td><router-link to="/eduAdmin/baseSetting/resource/eduAdminManageGrade">年级管理</router-link></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>教务管理模块</td>
            <td><router-link to="/eduAdmin/manage/plan/eduAdminEduPlan">培养方案</router-link></td>
            <td><router-link to="/eduAdmin/manage/plan/eduAdminTeachProcess">教学进度</router-link></td>
            <td><router-link to="/eduAdmin/manage/examination/eduAdminTchTeachingPlan">教学计划</router-link></td>
            <td><router-link to="/eduAdmin/baseSetting/person/eduAdminManageClass">学生异动情况</router-link></td>
            <td><router-link to="/eduAdmin/manage/examination/eduAdminEvaTeachingResult">教务查看评教</router-link></td>
            <td><router-link to="/eduAdmin/manage/plan/eduAdminSupervisorManage">教务管理督导</router-link></td>
          </tr>
          <tr>
            <td>通知公告模块</td>
            <td><router-link to="/eduAdmin/information/notifyInformation">公告信息</router-link></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>权限管理</td>
            <td><router-link to="/eduAdmin/role/eduAdminAuthorityManage2">权限设置</router-link></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <!--<tr>-->
            <!--<td>学生模块</td>-->
            <!--<td><router-link to="/studentTestInfoContent/query/stInquireGrade">学生查询成绩</router-link></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
          <!--</tr>-->
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                msg: ''
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
