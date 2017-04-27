import Vue from 'vue'
import Router from 'vue-router'

//陈志攀（start）
//***********************************学生*************************************************
import changPassword from '../views/student/changPasswordPage/changPasswordPage.vue'
import studentLesson from '../views/student/studentLessonPage/studentLessonPage.vue'
import studentTeacher from '../views/student/studentTeacherPage/studentTeacherPage.vue'
import educationMessage from '../views/student/educationMessagePage/educationMessagePage.vue'
import studentInformation from '../views/student/studentInformationPage/studentInformationPage.vue'
import studentEvaluation from '../views/student/studentEvaluationPage/studentEvaluationPage.vue'
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
import forgetPassword from '../views/main/forgetPwPage/forgetPwPage.vue'
import resetForgetPassword from '../views/main/resetForgetPwPage/resetForgetPwPage.vue'
import combineCoursePage from '../views/eduAdmin/smartArrangeCourse/combineCoursePage/combineCoursePage.vue'
import checkCoursePage from '../views/eduAdmin/smartArrangeCourse/checkCoursePage/checkCoursePage.vue'
import adjustCouApplyPage from '../views/eduAdmin/smartArrangeCourse/adjustCouApplyPage/adjustCouApplyPage.vue'
import banCouApplyPage from '../views/eduAdmin/smartArrangeCourse/banCouApplyPage/banCouApplyPage.vue'
import couArrangeSettingPage from '../views/eduAdmin/smartArrangeCourse/couArrangeSettingPage/couArrangeSettingPage.vue'
import textbookMgmtPage from '../views/eduAdmin/basicSettings/textbookMgmtPage/textbookMgmtPage.vue'
import classroomMgmtPage from '../views/eduAdmin/basicSettings/classroomMgmtPage/classroomMgmtPage.vue'
import eduResGroupMgmtPage from '../views/eduAdmin/basicSettings/eduResGroupMgmtPage/eduResGroupMgmtPage.vue'
import suspendCouApplyPage from '../views/eduAdmin/smartArrangeCourse/suspendCouApplyPage/suspendCouApplyPage.vue'
import makeupCouApplyPage from '../views/eduAdmin/smartArrangeCourse/makeupCouApplyPage/makeupCouApplyPage.vue'
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
import classManege from'../views/teacher/classManegePage/classManegePage.vue'
import classList from '../views/teacher/classListPage/classListPage.vue'
import certificateManege from '../views/teacher/certificateManegePage/certificateManegePage.vue'
import basicMessage from'../views/teacher/basicMessagePage/basicMessagePage.vue'
//易倩（end）

//蔡玲双（strat）
import adminCancelGrade from '../views/eduAdmin/markManage/adminCancelGradePage/adminCancelGradePage.vue'
import gradeQuery from '../views/eduAdmin/markManage/gradeQueryPage/gradeQueryPage.vue'
import gradeStat from '../views/eduAdmin/markManage/gradeStatPage/gradeStatPage.vue'
import makeupExamAdmin from '../views/eduAdmin/markManage/makeupExamAdminPage/makeupExamAdminPage.vue'
// tchSalary
import salary from '../views/eduAdmin/tchSalary/salaryPage/salaryPage.vue'
import setPrice from '../views/eduAdmin/tchSalary/setPricePage/setPricePage.vue'
// userManage
import authorityMgmt1 from '../views/eduAdmin/userManage/authorityMgmt1Page/authorityMgmt1Page.vue'



// *******************teacher***********************************
import tchCheckTimetable from '../views/teacher/tchCheckTimetablePage/tchCheckTimetablePage.vue'
import courseList from '../views/teacher/courseListPage/courseListPage.vue'
import gradesInput from '../views/teacher/gradesInputPage/gradesInputPage.vue'
import normalSchedule from '../views/teacher/normalSchedulePage/normalSchedulePage.vue'	// *******不要
import tchGradesInput from '../views/teacher/tchGradesInputPage/tchGradesInputPage.vue'
import tchManuAdjCl from '../views/teacher/tchManuAdjClPage/tchManuAdjClPage.vue'
//蔡玲双（end）
Vue.use(Router)

export default new Router({   //将routes里的参数导出
  routes: [

    {
      path: '/',   //这里只用'/'，即为默认路径
      name: '',
      component: studentInformation
    },
    //*******************************************************************（陈志攀start）
    //*******************************************************************学生（陈志攀）
    {
      path: '/student/setting/changPassword',
      name: 'changPassword',
      component: changPassword
    },
    {
      path: '/student/query/educationMessage',
      name: 'educationMessage',
      component: educationMessage
    },
    {
      path: '/student/query/studentLesson',
      name: 'studentLesson',
      component: studentLesson
    },
    {
      path: '/student/query/studentTeacher',
      name: 'studentTeacher',
      component: studentTeacher
    },
    {
      path: '/student/setting/studentInformation',
      name: 'studentInformation',
      component: studentInformation
    },
    {
      path: '/student/setting/studentEvaluation',
      name: 'studentEvaluation',
      component: studentEvaluation
    },
    //*******************************************************************教务（陈志攀）
    {
      path: '/eduAdmin/test/eduAdminManager',
      name: 'eduAdminManager',
      component: eduAdminManager
    },
    //*******************************************************************（陈志攀end）
    //*******************************************************************（吴坚start）
    {
      path: '/stInquireGrade',
      name: 'stInquireGrade',
      component: stInquireGrade
    },
    {
      path: '/eduAdminManageStd',
      name: 'eduAdminManageStd',
      component: eduAdminManageStd
    },
    {
      path: '/eduAdminManageTch',
      name: 'eduAdminManageTch',
      component: eduAdminManageTch
    },
    {
      path: '/eduAdminEduPlan',
      name: 'eduAdminEduPlan',
      component: eduAdminEduPlan
    },
    {
      path: '/eduAdminTeachProcess',
      name: 'eduAdminTeachProcess',
      component: eduAdminTeachProcess
    },
    {
      path: '/eduAdminTchTeachingPlan',
      name: 'eduAdminTchTeachingPlan',
      component: eduAdminTchTeachingPlan
    },
    {
      path: '/eduAdminManageClass',
      name: 'eduAdminManageClass',
      component: eduAdminManageClass
    },
    {
      path: '/eduAdminEvaTeachingResult',
      name: 'eduAdminEvaTeachingResult',
      component: eduAdminEvaTeachingResult
    },
    {
      path: '/eduAdminSupervisorManage',
      name: 'eduAdminSupervisorManage',
      component: eduAdminSupervisorManage
    },
    {
      path: '/eduAdminAuthorityManage2',
      name: 'eduAdminAuthorityManage2',
      component: eduAdminAuthorityManage2
    },
    {
      path: '/eduAdminManageGrade',
      name: 'eduAdminManageGrade',
      component: eduAdminManageGrade
    },
    //*******************************************************************（吴坚end）
    //*******************************************************************（李西炜start）
    {
      path: '/eduAdmin/course/courseInfor/checkCourse',
      name: '/eduAdmin/course/courseInfor/checkCourse',
      component: checkCoursePage
      //  教务查看课表页面
    },
    {
      path: '/eduAdmin/course/courseInfor/adjustCouApply',
      name: '/eduAdmin/course/courseInfor/adjustCouApply',
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
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
      //  忘记密码找回页面
    },
    {
      path: '/resetForgetPassword',
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
      path: '/eduAdmin/course/courseInfor/suspendCouApply',
      name: '/eduAdmin/course/courseInfor/suspendCouApply',
      component: suspendCouApplyPage
      //  停课申请处理页面
    },
    {
      path: '/eduAdmin/course/courseInfor/makeupCouApply',
      name: '/eduAdmin/course/courseInfor/makeupCouApply',
      component: makeupCouApplyPage
      //  补课申请处理页面
    },
    //*******************************************************************（李西炜end）

    //*******************************************************************（易倩start）
    {
      path: '/teacher/teachingPlan',
      component: teachingPlan
    },
    {
      path: '/teacher/teachingEvaluate',
      component: teachingEvaluate
    },
    {
      path: '/teacher/stopClass',
      component:stopClass
    },
    {
      path: '/teacher/research',
      component: research
    },
    {
      path: '/teacher/requirement',
      component:requirement
    },
    {
      path: '/teacher/passwdChange',
      component:   passwdChange
    },
    {
      path: '/teacher/messageNotice',
      component:  messageNotice
    },
    {
      path: '/teacher/makeupClass',
      component:  makeupClass
    },
    {
      path: '/teacher/experience',
      component:experience
    },
    {
      path: '/teacher/educationManege',
      component:educationManege
    },
    {
      path: '/teacher/director',
      component:director
    },
    {
      path:'/teacher/directorResult',
      component:directorResult
    },
    {
      path: '/teacher/classManege',
      component:classManege
    },
    {
      path: '/teacher/classList',
      component:classList
    },
    {
      path: '/teacher/certificateManege',
      component:certificateManege
    },
    {
      path: '/teacher/basicMessage',
      component:basicMessage
    },
    //******************************************************************（易倩end)

    //******************************************************************（蔡玲双start）
    {
      path: '/eduAdmin/markManage/adminCancelGrade',
      name: 'adminCancelGrade',
      component: adminCancelGrade
    },
    {
      path: '/eduAdmin/markManage/gradeQuery',
      name: 'gradeQuery',
      component: gradeQuery
    },
    {
      path: '/eduAdmin/markManage/gradeStat',
      name: 'gradeStat',
      component: gradeStat
    },
    {
      path: '/eduAdmin/markManage/makeupExamAdmin',
      name: 'makeupExamAdmin',
      component: makeupExamAdmin
    },
    {
      path: '/eduAdmin/tchSalary/salary',
      name: 'salary',
      component: salary
    },
    {
      path: '/eduAdmin/tchSalary/setPrice',
      name: 'setPrice',
      component: setPrice
    },
    {
      path: '/eduAdmin/userManage/authorityMgmt1',
      name: 'authorityMgmt1',
      component: authorityMgmt1
    },


    // teacher
    {
      path: '/teacher/tchCheckTimetable',
      name: 'tchCheckTimetable',
      component: tchCheckTimetable
    },
    {
      path: '/teacher/courseList',
      name: 'courseList',
      component: courseList
    },
    {
      path: '/teacher/gradesInput',
      name: 'gradesInput',
      component: gradesInput
    },
    {
      path: '/teacher/normalSchedule',
      name: 'normalSchedule',
      component: normalSchedule	// **************不要
    },
    {
      path: '/teacher/tchGradesInput',
      name: 'tchGradesInput',
      component: tchGradesInput
    },
    {
      path: '/teacher/tchManuAdjCl',
      name: 'tchManuAdjCl',
      component: tchManuAdjCl
    }
    //******************************************************************（蔡玲双end）
  ]
})
