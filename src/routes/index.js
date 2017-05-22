import Vue from 'vue'
import Router from 'vue-router'

//陈志攀（start）
//***********************************学生*************************************************
import studentChangPassword from '../views/student/studentChangPasswordPage/studentChangPasswordPage.vue'
import studentLesson from '../views/student/studentLessonPage/studentLessonPage.vue'
import studentTeacher from '../views/student/studentTeacherPage/studentTeacherPage.vue'
import educationMessage from '../views/student/studentEducationMessagePage/studentEducationMessagePage.vue'
import studentInformation from '../views/student/studentInformationPage/studentInformationPage.vue'
import studentEvaluation from '../views/student/studentEvaluationPage/studentEvaluationPage.vue'
import studentTestInfo from '../views/student/studentTestInfoPage/studentTeacherPage.vue'
//***********************************教师*************************************************
import teacherTestInfo from '../views/teacher/teacherTestInfoPage/teacherTestInfoPage.vue'
//***********************************教务*************************************************
import eduAdminManager from '../views/eduAdmin/eduAdminManagerPage/eduAdminManagerPage.vue'
//陈志攀（end）

//吴坚（start）
import stInquireGrade from '../views/student/inquireGradePage/inquireGradePage.vue'
import eduAdminManageStd from '../views/eduAdmin/basicSettings/manageStdPage/manageStdPage.vue'
import eduAdminManageTch from '../views/eduAdmin/basicSettings/manageTchPage/manageTchPage.vue'
import eduAdminEduPlan from '../views/eduAdmin/eduManage/eduPlanPage/eduPlanPage.vue'
import eduAdminTeachProcess from '../views/eduAdmin/eduManage/teachProcessPage/teachProcessPage.vue'
import eduAdminTchTeachingPlan from '../views/eduAdmin/eduManage/tchTeachingPlanPage/tchTeachingPlanPage.vue'
import eduAdminManageClass from '../views/eduAdmin/eduManage/manageClassPage/manageClassPage.vue'
import eduAdminEvaTeachingResult from '../views/eduAdmin/eduManage/evaTeachingResultPage/evaTeachingResultPage.vue'
import eduAdminSupervisorManage from '../views/eduAdmin/eduManage/supervisorManagePage/supervisorManagePage.vue'
import eduAdminAuthorityManage2 from '../views/eduAdmin/userManage/authorityManage2Page/authorityManage2Page.vue'
import eduAdminManageGrade from '../views/eduAdmin/basicSettings/manageGradePage/manageGradePage.vue'
// 吴坚（end）

//李西炜（start）
import login from '../views/main/loginPage/loginPage.vue'
import eduAdminHome from '../views/main/eduAdminHomePage/eduAdminHomePage.vue'
import teacherHome from '../views/main/teacherHomePage/teacherHomePage.vue'
import studentHome from '../views/main/studentHomePage/studentHomePage.vue'
import forgetPassword from '../views/main/forgetPwPage/forgetPwPage.vue'
import resetForgetPassword from '../views/main/resetForgetPwPage/resetForgetPwPage.vue'
import combineCoursePage from '../views/eduAdmin/smartArrangeCourse/combineCoursePage/combineCoursePage.vue'
import checkCoursePage from '../views/eduAdmin/smartArrangeCourse/checkCoursePage/checkCoursePage.vue'
import adjustCouApplyPage from '../views/eduAdmin/smartArrangeCourse/adjustCouApplyPage/adjustCouApplyPage.vue'
import banCouApplyPage from '../views/eduAdmin/smartArrangeCourse/banCouApplyPage/banCouApplyPage.vue'
import couArrangeSettingPage from '../views/eduAdmin/smartArrangeCourse/couArrangeSettingPage/couArrangeSettingPage.vue'
import couArrangeTablePage from '../views/eduAdmin/smartArrangeCourse/couArrangeTablePage/couArrangeTablePage.vue'
import textbookMgmtPage from '../views/eduAdmin/basicSettings/textbookMgmtPage/textbookMgmtPage.vue'
import classroomMgmtPage from '../views/eduAdmin/basicSettings/classroomMgmtPage/classroomMgmtPage.vue'
import eduResGroupMgmtPage from '../views/eduAdmin/basicSettings/eduResGroupMgmtPage/eduResGroupMgmtPage.vue'
import suspendCouApplyPage from '../views/eduAdmin/smartArrangeCourse/suspendCouApplyPage/suspendCouApplyPage.vue'
import makeupCouApplyPage from '../views/eduAdmin/smartArrangeCourse/makeupCouApplyPage/makeupCouApplyPage.vue'
import notifyInformationPage from '../views/eduAdmin/notice/notifyInformationPage/notifyInformationPage.vue'
//李西炜（end）

//易倩（start）
import  teachingPlan from '../views/teacher/teachingPlanPage/teachingPlanPage.vue'
import teachingEvaluate from'../views/teacher/teachingEvaluatePage/teachingEvaluatePage.vue'
import stopClass from'../views/teacher/stopClassPage/stopClassPage.vue'
import research from'../views/teacher/researchPage/researchPage.vue'
import requirement from'../views/teacher/requirementPage/requirementPage.vue'
import passwdChange from '../views/teacher/passwdChangePage/passwdChangePage.vue'
import messageNotice from '../views/teacher/messageNoticePage/messageNoticePage.vue'
import makeupClass from'../views/teacher/makeupClassPage/makeupClassPage.vue'
import experience from'../views/teacher/experiencePage/experiencePage.vue'
import educationManege from'../views/teacher/educationManegePage/educationManegePage.vue'
import director from'../views/teacher/directorPage/directorPage.vue'
import directorResult from'../views/teacher/directorResultPage/directorResultPage.vue'
//import directorResultList from'../views/teacher/directorResultListPage/directorResultListPage.vue'
import classManege from'../views/teacher/classManegePage/classManegePage.vue'
import classList from '../views/teacher/classListPage/classListPage.vue'
import certificateManege from '../views/teacher/certificateManegePage/certificateManegePage.vue'
import basicMessage from'../views/teacher/basicMessagePage/basicMessagePage.vue'
import studentMessage from'../views/teacher/studentMessagePage/stopClassPage.vue'
import checkStudentInfo from'../views/teacher/checkStudentInfoPage/checkStudentInfoPage.vue'
//易倩（end）

//蔡玲双（strat）
// *******************eduAdmin***********************************
// markManage
import adminCancelGrade from '../views/eduAdmin/markManage/adminCancelGradePage/adminCancelGradePage.vue'
import gradeQuery from '../views/eduAdmin/markManage/gradeQueryPage/gradeQueryPage.vue'
import gradeStat from '../views/eduAdmin/markManage/gradeStatPage/gradeStatPage.vue'
import makeupExamAdmin from '../views/eduAdmin/markManage/makeupExamAdminPage/makeupExamAdminPage.vue'
import makeupGradeInput from '../views/eduAdmin/markManage/makeupGradeInputPage/makeupGradeInputPage.vue'
import salary from '../views/eduAdmin/tchSalary/salaryPage/salaryPage.vue'
import setPrice from '../views/eduAdmin/tchSalary/setPricePage/setPricePage.vue'
import authorityMgmt1 from '../views/eduAdmin/userManage/authorityMgmt1Page/authorityMgmt1Page.vue'
import noticeManage from '../views/eduAdmin/notice/noticeMgmtPage/noticeManage.vue'
import noticeSetting from '../views/eduAdmin/notice/noticeSettingPage/noticeSetting.vue'
import notifyInformation from '../views/eduAdmin/notice/notifyInformationPage/notifyInformationPage.vue'
// *******************main***********************************
import eduAdminHomePage from '../views/main/eduAdminHomePage/eduAdminHomePage.vue'
// *******************teacher***********************************
import tchCheckTimetable from '../views/teacher/tchCheckTimetablePage/tchCheckTimetablePage.vue'
import courseList from '../views/teacher/courseListPage/courseListPage.vue'
import gradesInput from '../views/teacher/gradesInputPage/gradesInputPage.vue'
import normalSchedule from '../views/teacher/normalSchedulePage/normalSchedulePage.vue'
import tchGradesInput from '../views/teacher/tchGradesInputPage/tchGradesInputPage.vue'
import tchManuAdjCl from '../views/teacher/tchManuAdjClPage/tchManuAdjClPage.vue'
import tchCheckSalary from '../views/teacher/tchCheckSalaryPage/tchCheckSalaryPage.vue'
//蔡玲双（end）
Vue.use(Router)

export default new Router({   //将routes里的参数导出

  routes: [
    {
      path: '/',   //这里只用'/'，即为默认路径
      name: '',
      component: login
    },
    //*******************************************************************（陈志攀start）
    {
      //学生密码修改
      path: '/studentTestInfoContent/setting/changPassword',
      name: 'studentChangPassword',
      component: studentChangPassword
    },
    /*
    {
      //学生通知信息
      path: '/studentTestInfoContent/query/educationMessage',
      name: 'educationMessage',
      component: educationMessage
    },
    */
    {
      //学生课表查询
      path: '/studentTestInfoContent/query/studentLesson',
      name: 'studentLesson',
      component: studentLesson
    },
    {
      //学生查看教师
      path: '/studentTestInfoContent/query/studentTeacher',
      name: 'studentTeacher',
      component: studentTeacher
    },
    {
      //学生个人信息
      path: '/studentTestInfoContent/setting/studentInformation',
      name: 'studentInformation',
      component: studentInformation
    },
    {
      //学生评教界面
      path: '/studentTestInfoContent/setting/studentEvaluation',
      name: 'studentEvaluation',
      component: studentEvaluation
    },
    {
      //学生考场查询
      path: '/studentTestInfoContent/query/studentTestInfo',
      name: 'studentTestInfo',
      component: studentTestInfo
    },
    {
      //教师查看考场
      path: '/teacher/classInfo/teacherTestInfo',
      name: 'teacherTestInfo',
      component: teacherTestInfo
    },
    {
      //考务管理界面
      path: '/eduAdmin/eduAdminManage',
      name: 'eduAdminManager',
      component: eduAdminManager
    },
    //*******************************************************************（陈志攀end）
    //*******************************************************************（吴坚start）
    {
      //学生查询成绩界面
      path: '/studentTestInfoContent/query/stInquireGrade',
      name: 'stInquireGrade',
      component: stInquireGrade
    },
    {
      //学生管理界面
      path: '/eduAdmin/baseSetting/person/eduAdminManageStd',
      name: 'eduAdminManageStd',
      component: eduAdminManageStd
    },
    {
      //教师管理界面
      path: '/eduAdmin/baseSetting/person/eduAdminManageTch',
      name: 'eduAdminManageTch',
      component: eduAdminManageTch
    },
    {
      //培养方案界面
      path: '/eduAdmin/manage/plan/eduAdminEduPlan',
      name: 'eduAdminEduPlan',
      component: eduAdminEduPlan
    },
    {
      //教学进程界面
      path: '/eduAdmin/manage/plan/eduAdminTeachProcess',
      name: 'eduAdminTeachProcess',
      component: eduAdminTeachProcess
    },
    {
      //教师授课计划界面
      path: '/eduAdmin/manage/examination/eduAdminTchTeachingPlan',
      name: 'eduAdminTchTeachingPlan',
      component: eduAdminTchTeachingPlan
    },
    {
      //班级管理界面
      path: '/eduAdmin/baseSetting/resource/eduAdminManageClass',
      name: 'eduAdminManageClass',
      component: eduAdminManageClass
    },
    {
      //评教结果界面
      path: '/eduAdmin/manage/examination/eduAdminEvaTeachingResult',
      name: 'eduAdminEvaTeachingResult',
      component: eduAdminEvaTeachingResult
    },
    {
      //教务管理督导界面
      path: '/eduAdmin/manage/plan/eduAdminSupervisorManage',
      name: 'eduAdminSupervisorManage',
      component: eduAdminSupervisorManage
    },
    {
      //权限管理2界面
      path: '/eduAdmin/role/eduAdminAuthorityManage2',
      name: 'eduAdminAuthorityManage2',
      component: eduAdminAuthorityManage2
    },
    {
      //年级管理界面
      path: '/eduAdmin/baseSetting/resource/eduAdminManageGrade',
      name: 'eduAdminManageGrade',
      component: eduAdminManageGrade
    },
    /*
    {
      //公告信息通知界面
      path: '/Systeminfo/eduAdminNotifyInformation',
      name: 'eduAdminNotifyInformation',
      component: eduAdminNotifyInformation
    },
    */
    //*******************************************************************（吴坚end）
    //*******************************************************************（李西炜start）
    {
      path: '/login/main/eduAdminHome',
      name: '/eduAdminHome',
      component: eduAdminHome
    },
    {
      path: '/login/main/teacherHome',
      name: '/teacherHome',
      component: teacherHome
    },
    {
      path: '/login/main/studentHome',
      name: '/studentHome',
      component: studentHome
    },
    {
      path: '/eduAdmin/course/courseInfo/checkCourse',
      name: '/eduAdmin/course/courseInfo/checkCourse',
      component: checkCoursePage
      //  教务查看课表页面
    },
    {
      path: '/eduAdmin/course/courseInfo/adjustCouApply',
      name: '/eduAdmin/course/courseInfo/adjustCouApply',
      component: adjustCouApplyPage
      //  教务员调课申请处理页面
    },
    {
      path: '/login',
      name: 'login',
      component: login
      //  登录页面
    },
    {
      path: '/login/operation/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
      //  忘记密码找回页面
    },
    {
      path: '/login/operation/resetForgetPassword',
      name: 'resetForgetPassword',
      component: resetForgetPassword
      //  忘记密码重置页面
    },
    {
      path: '/eduAdmin/course/courseOperation/combineCourse',
      name: '/eduAdmin/course/courseOperation/combineCourse',
      component: combineCoursePage
      //  教务员合课界面
    },
    {
      path: '/eduAdmin/course/courseOperation/banCouApply',
      name: '/eduAdmin/course/courseOperation/banCouApply',
      component: banCouApplyPage
      //  课程禁排申请处理页面
    },
    {
      path: '/eduAdmin/course/courseOperation/couArrangeSetting',
      name: '/eduAdmin/course/courseOperation/couArrangeSetting',
      component: couArrangeSettingPage
      //  排课课程管理页面
    },
    {
      path: '/eduAdmin/course/courseOperation/couArrangeTable',
      name: '/eduAdmin/course/courseOperation/couArrangeTable',
      component: couArrangeTablePage
      //  排课结果课表页面
    },
    {
      path: '/eduAdmin/baseSetting/resource/textbookMgmt',
      name: '/eduAdmin/baseSetting/resource/textbookMgmt',
      component: textbookMgmtPage
      //  教材信息管理页面
    },
    {
      path: '/eduAdmin/baseSetting/resource/classroomMgmt',
      name: '/eduAdmin/baseSetting/resource/classroomMgmt',
      component: classroomMgmtPage
      //  教室信息管理页面
    },
    {
      path: '/eduAdmin/baseSetting/person/eduResGroupMgmt',
      name: '/eduAdmin/baseSetting/person/eduResGroupMgmt',
      component: eduResGroupMgmtPage
      //  教研组信息管理页面
    },
    {
      path: '/eduAdmin/course/courseInfo/suspendCouApply',
      name: '/eduAdmin/course/courseInfo/suspendCouApply',
      component: suspendCouApplyPage
      //  停课申请处理页面
    },
    {
      path: '/eduAdmin/course/courseInfo/makeupCouApply',
      name: '/eduAdmin/course/courseInfo/makeupCouApply',
      component: makeupCouApplyPage
      //  补课申请处理页面
    },
    {
      path: '/eduAdmin/information/notifyInformation',
      name: '/eduAdmin/information/notifyInformation',
      component: notifyInformationPage
    },
    //*******************************************************************（李西炜end）

    //*******************************************************************（易倩start）
    {
      //管理教研组
      path: '/teacher/group/research',
      component: research
    },
    {
      //审批教学计划
      path: '/teacher/group/eduAdminTchTeachingPlan',
      component: teachingPlan
    },
    {//申请补课
      path: '/teacher/course/makeupClass',
      component:  makeupClass
    },
    {
      //停课申请
      path: '/teacher/course/stopClass',
      component:stopClass
    },
    {
      //禁排申请
      path: '/teacher/course/requirement',
      component:requirement
    },
    {//督导反馈
      path: '/teacher/teach/director',
      component:director
    },
    {//督导结果
      path:'/teacher/directorResult',
      component:directorResult
    },
    {
      //查看评教
      path: '/teacher/class/teachingEvaluate',
      component: teachingEvaluate
    },
    {//班级列表
      path: '/teacher/class/classList',
      component:classList
    },
    {//班主任查看学生个人信息
      path: '/teacher/class/checkStudentInfo',
      component:checkStudentInfo
    },
    {
      //密码修改
      path: '/teacher/info/passwdChange',
      component:passwdChange
    },
    /*
    {
      path: '/teacher/teach/messageNotice',
      component:  messageNotice
    },
    {//教务发布通知
      path: '/eduAdmin/noticeManage',
      component:  noticeManages
    },
    */
    {//教师基本信息
      path: '/teacher/personInfo/basicMessage',
      component:basicMessage
    },
    {//教师经历
      path: '/teacher/info/experience',
      component:experience
    },
    {//教育管理
      path: '/teacher/info/educationManege',
      component:educationManege
    },
    /*
    {
      path:'/teacher/directorResultList',
      component:directorResultList
    },
    {//废弃
      path: '/teacher/classManege',
      component:classManege
    },
    */
    {//证书管理
      path: '/teacher/info/certificateManege',
      component:certificateManege
    },
    //******************************************************************（易倩end)

    //******************************************************************（蔡玲双start）
    //eduAdmin
    {
      // 教务-管理员撤销成绩
      path: '/eduAdmin/gradeManage/grade/adminCancelGrade',
      name: 'adminCancelGrade',
      component: adminCancelGrade
    },
    {
      // 教务-成绩查询（学号查询）
      path: '/eduAdmin/gradeManage/grade/gradeQuery',
      name: 'gradeQuery',
      component: gradeQuery
    },
    {
      // 教务-成绩统计（分数段查询）
      path: '/eduAdmin/gradeManage/grade/gradeStat',
      name: 'gradeStat',
      component: gradeStat
    },
    {
      // 教务-补考成绩管理
      path: '/eduAdmin/gradeManage/makeupExam/makeupExamAdmin',
      name: 'makeupExamAdmin',
      component: makeupExamAdmin
    },
    {
      // 教务-补考成绩输入
      path: '/eduAdmin/gradeManage/makeupExam/makeupGradeInput',
      name: 'makeupGradeInput',
      component: makeupGradeInput
    },
    {
      // 教务-薪酬单
      path: '/eduAdmin/emolument/salary',
      name: 'salary',
      component: salary
    },
    {
      // 教务-设置单价
      path: '/eduAdmin/emolument/setPrice',
      name: 'setPrice',
      component: setPrice
    },
    {
      // 教务-权限管理1（角色管理）
      path: '/eduAdmin/role/authorityMgmt1',
      name: 'authorityMgmt1',
      component: authorityMgmt1
    },
    {
      // 教务-公告管理
      path: '/eduAdmin/information/noticeManage',
      name: 'noticeManage',
      component: noticeManage
    },
    {
      // 教务-公告编辑
      path: '/eduAdmin/information/noticeSetting',
      name: 'noticeSetting',
      component: noticeSetting
    },
    {
      // 教务-公告详细
      path: '/eduAdmin/information/notifyInformation',
      name: 'notifyInformation',
      component: notifyInformation
    },



    // teacher
    {
      // 教师-查看教师课表
      path: '/teacher/classInfo/tchCheckTimetable',
      name: 'tchCheckTimetable',
      component: tchCheckTimetable
    },
    {
      // 教师-查看个人薪酬单
      path: '/teacher/classInfo/tchCheckSalary',
      name: 'tchCheckSalary',
      component: tchCheckSalary
    },
    {
      // 教师-教学计划
      path: '/teacher/teach/courseList',
      name: 'courseList',
      component: courseList
    },
    {
      // 教师-上课签到
      path: '/teacher/teach/normalSchedule',
      name: 'normalSchedule',
      component: normalSchedule
    },
    {
      // 教师-正考成绩输入
      path: '/teacher/class/gradesInput',
      name: 'gradesInput',
      component: gradesInput
    },
    {
      // 教师-成绩录入
      path: '/teacher/class/tchGradesInput',
      name: 'tchGradesInput',
      component: tchGradesInput
    },
    {
      // 教师-调课申请
      path: '/teacher/course/tchManuAdjCl',
      name: 'tchManuAdjCl',
      component: tchManuAdjCl
    }

    //******************************************************************（蔡玲双end）
  ]
})
