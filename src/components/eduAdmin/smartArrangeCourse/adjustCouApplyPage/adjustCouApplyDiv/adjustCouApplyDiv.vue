    <template>
    <div id="adjustCouApplyDiv">
        <div class="blank"></div>
        <div id="tableDiv">
        <table class="operationTable">
                <thead>
                    <tr>
                        <th class="headTh">申请教师</th>
                        <th class="headTh">调课课程</th>
                        <th class="headTh">上课班级</th>
                        <th class="headTh">申请内容</th>
                        <th class="headTh">申请时间</th>
                        <th class="headTh">申请理由</th>
                        <th class="headTh">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(application,index) in applications" :id="index">
                        <td>{{ application.teacherName }}</td>
                        <td>{{ application.courseName }}</td>
                        <td>{{ application.className }}</td>
                        <td>{{ application.lessonsChangeInfo }}</td>
                        <td>{{ application.applicationTime }}</td>
                        <td>{{ application.mediationReason }}</td>
                        <td>
                            <button @click="setTrue(applications,index,application.index)">√</button>
                            <!--<button @click="setTrue(index)">√</button>-->
                            <!--申请通过批准-->
                            <button @click="setFalse(applications,index,application.index)">×</button>
                            <!--申请拒绝-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'adjustCouApplyDiv',
        data () {
            return {
                applications: []
            }
        },
        beforeMount: function() {
            this.$http.post('./alternateLessionHandle.action',{},{
//            this.$http.post('../testPhp/adjustCouApply.php',{},{
                "Content-Type":"application/json"
            }).then(function(response){
                console.log("获取申请:");
                console.log(response.body);
                var data = response.body;
                this.applications = data.applicationsList;
            },function(error){
                console.log("获取申请error:");
                console.log(error);
            });
        },
        methods: {
            setTrue: function(applications,index,id){
                //预留功能，需要后端返回处理确认
                if(confirm("您确定通过该申请吗？")){
                    console.log(id);
                    this.$http.post('./alternateLessionHandle/result-button.action',{
//                    this.$http.post('../testPhp/adjustCouApplySetTrue.php',{
                        "teacherId": this.applications[index].teacherId,
                        "teacherName": this.applications[index].teacherName,
                        "courseName": this.applications[index].courseName,
                        "lessonsChangeInfo": this.applications[index].lessonsChangeInfo,
                        "useClassroom": this.applications[index].useClassroom,
                        "classId": this.applications[index].classId,
                        "className": this.applications[index].className,
                        "applicationTime": this.applications[index].applicationTime,
                        "mediationReason": this.applications[index].mediationReason,
                        "giveLessonsDetailsId": this.applications[index].giveLessonsDetailsId,
                        "operation": 1
                    },{
                        "Content-Type":"application/json"
                    }).then(function(response){
                        console.log("通过申请:");
                        console.log(response);
                        var data = response.body;
                        if(data.result == "1") {
                            applications.splice(index, 1);
                        }else{
                            alert("操作失败！请重试");
                        }
                    },function(error){
                        console.log("通过申请error:");
                        console.log(error);
                    });
                }
            },
            setFalse: function(applications,index,id){
                 //预留功能，需要后端返回处理确认
                if(confirm("您确定拒绝该申请吗？")){
                    this.$http.post('./alternateLessionHandle/result-button.action',{
//                    this.$http.post('../testPhp/adjustCouApplySetFalse.php',{
                        "teacherId": this.applications[index].teacherId,
                        "teacherName": this.applications[index].teacherName,
                        "courseName": this.applications[index].courseName,
                        "lessonsChangeInfo": this.applications[index].lessonsChangeInfo,
                        "useClassroom": this.applications[index].useClassroom,
                        "classId": this.applications[index].classId,
                        "className": this.applications[index].className,
                        "applicationTime": this.applications[index].applicationTime,
                        "mediationReason": this.applications[index].mediationReason,
                        "giveLessonsDetailsId": this.applications[index].giveLessonsDetailsId,
                        "operation": 0
                    },{
                        "Content-Type":"application/json"
                    }).then(function(response){
                        console.log("拒绝申请:");
                        console.log(response.body);
                        var data = response.body;
                        if(data.result == "1") {
                            applications.splice(index, 1);
                        }else{
                            alert("操作失败！请重试");
                        }
                    },function(error){
                        console.log("拒绝申请error:");
                        console.log(error);
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #adjustCouApplyDiv{
        /*页面*/
        margin: 0 auto;
        background-color: #f3f3f3;
        height: 100%;
    }
    .blank {
        height: 2.9rem;
    }
    #tableDiv{
        margin: 0 5rem;
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
    @media screen and (max-width:1023px) {
        html {
        }
    }
</style>
