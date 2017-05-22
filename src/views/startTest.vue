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
            <td><router-link to="/eduAdminManageStd">学生管理</router-link></td>
            <td><router-link to="/eduAdminManageTch">教师管理</router-link></td>
            <td><router-link to="/eduAdminManageGrade">年级管理</router-link></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>教务管理模块</td>
            <td><router-link to="/eduAdminEduPlan">培养方案</router-link></td>
            <td><router-link to="/eduAdminTeachProcess">学期教学进程</router-link></td>
            <td><router-link to="/eduAdminTchTeachingPlan">教师教学计划</router-link></td>
            <td><router-link to="/eduAdminManageClass">班级管理</router-link></td>
            <td><router-link to="/eduAdminEvaTeachingResult">教务查看评教</router-link></td>
            <td><router-link to="/eduAdminSupervisorManage">督导设置</router-link></td>
          </tr>
          <tr>
            <td>通知公告模块</td>
            <td><router-link to="/notifyInformation">信息通知</router-link></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>权限管理</td>
            <td><router-link to="/eduAdminAuthorityManage2">权限管理页面2</router-link></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>学生模块</td>
            <td><router-link to="/stInquireGrade">学生查询成绩</router-link></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
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
