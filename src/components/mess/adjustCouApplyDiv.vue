<template>
    <div id="adjustCouApplyDiv">
        <table>
            <tr>
                <td class="headTd">申请教师</td>
                <td class="headTd">调换教师</td>
                <td class="headTd">申请内容</td>
                <td class="headTd">教师反馈</td>
                <td class="headTd">申请时间</td>
                <td class="headTd">操作</td>
            </tr>
            <!--表头-->
            <tr v-for="(application,index) in applications" :id="index">
                <td>{{ application.teacherA }}</td>
                <td>{{ application.teacherB }}</td>
                <td>{{ application.appContent }}</td>
                <td>{{ application.feedback }}</td>
                <td>{{ application.appTime }}</td>
                <td>
                    <button @click="setTrue(applications,index)">√</button>

                    <!--申请通过批准-->
                    <button @click="setFalse(applications,index)">×</button>
                    <!--申请拒绝-->
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'adjustCouApplyDiv',
        data () {
            return {
                applications: [
                    { teacherA: '张三', teacherB: '李小红', appContent: '第一周周一第3节调换至第一周周三第3节', feedback: '同意', appTime: '2016.08.01' },
                    { teacherA: '李四', teacherB: '张三', appContent: '第二周周五第1节调换至第三周周一第5节', feedback: '同意', appTime: '2016.08.02' },
                    { teacherA: '王五', teacherB: '李四', appContent: '第一周周三第1节调换至第三周周一第5节', feedback: '同意', appTime: '2016.08.02' },
                    { teacherA: '李小红', teacherB: '王五', appContent: '第一周周一第3节调换至第三周周一第5节', feedback: '同意', appTime: '2016.08.02' }
                ],
            }
        },
        methods: {
            setTrue: function(applications,index){
                //预留功能，需要后端返回处理确认
                if(confirm("您确定通过该申请吗？")){
//                    var applicationTr = document.getElementById(id);
//                    applicationTr.style.display = "none";
                  applications.splice(index, 1);

                }
            },
            setFalse: function(applications,index){
                 //预留功能，需要后端返回处理确认
                if(confirm("您确定拒绝该申请吗？")){
//                    var applicationTr = document.getElementById(id);
//                    applicationTr.style.display = "none";
                  applications.splice(index, 1);
                }
            }
        }
    }
</script>

<style scoped>
    html{
    }
    #adjustCouApplyDiv{
        /*页面*/
        margin: 1.5rem auto;
        background-color: white;
        width: 80%;
        border: solid white;
        padding: 1rem 0;
        display: flex;
        justify-content: center;
    }
    table{
        width: 90%;
        border-collapse: collapse;
    }
    td{
        width: 2rem;
        min-height: 2rem;
    }
    button{
        outline: none;
        border: thin solid #A6A6A6;
        background-color: white;
        color: #A6A6A6;
        border-radius: 1rem;
        font-size: 1rem;
        width: 1.45rem;
    }
    button:hover{
        background-color: red;
        color: white;
        border: red;
    }
    .headTd{
        /*表头*/
        border-bottom: thin solid #9D96B6;
    }
    @media screen and (max-width:1023px) {
        html {
        }
    }
</style>
