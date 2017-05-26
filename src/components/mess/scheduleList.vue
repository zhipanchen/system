<template>
<div>
	<div class="spanButton">
		<div class="lpart">
			<span class="textWeight">【{{courseName}}】</span>
        	<span class="textBlue">（注：请在上课后五天内填写）</span>
        </div>
        <div class="rpart">
			<button class="am-btn am-btn-success am-radius rightBtn" @click="returnBtn()">返回</button>
			<button class="am-btn am-btn-success am-radius rightBtn" @click="signInBtn()">签到</button>
			<Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
			    <div slot="header" style="font-size:1.6rem; text-align:center; padding:0.2rem 0;" id="modalHeader">
		            <span>上课日志</span>
		        </div>
			    <div style="text-align:center; font-size:1.1rem;">
			    	<select v-model="selWeekList" @change="selWeekChange()">
						<option disabled>选择周数</option>
						<option v-for="weekListOne in weekList" :value="weekListOne">{{weekListOne}}</option>
					</select>
					<select v-model="selGiveLessonsDetailsList">
						<option disabled>选择上课时间</option>
						<option v-for="detailsOne in giveLessonsDetailsList" :value="detailsOne.giveLessonsDetailsId">{{detailsOne.timeandplaceInfo}}</option>
					</select>
			    	<Input v-model="data.teachJournalInFo" type="textarea" :rows="7" placeholder="请输入..."></Input>
			    	<p style="text-align:left; font-size:0.9rem; color:red;">请认真核对所写信息！提交教学日志进行签到，并且不可重复签到。</p>
			    </div>
			    <div slot="footer" style="text-align:center;">
			        <Button id="modalBtn" @click="ok1(index)">提交</Button>
			        <Button id="modalBtn" @click="cancel1(index)">取消</Button>
			    </div>
			</Modal>
		</div>
	</div>

	<div id="scheduleList">
		<div class="classList">
			<table class="normalTable">
				<thead>
					<tr>
						<td width="20%">签到日期</td>
						<td width="10%">周数</td>
						<td width="10%">星期</td>
						<td width="20%">上课节数</td>
						<td width="20%">教室</td>
						<td width="20%">查看日志</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in teachJournalDetailList">
						<td>{{data.signInTime}}</td>
						<td>{{data.execWeek}}</td>
						<td>{{data.weekdays}}</td>
						<td>第 {{data.lessonNum}} 大节</td>
						<td>{{data.classroomId}}</td>
						<td class="textBtn">
							<a id="affirmState" :value="data.giveLessonDetailsId" @click="tchJournal(index)">上课日志</a>
							

							<Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
							    <div slot="header" style="font-size:1.6rem; text-align:center; padding:0.2rem 0;" id="modalHeader">
						            <span>上课日志</span>
						        </div>
							    <div style="text-align:center; font-size:1.1rem;">
							    	<Input v-model="data.teachJournalInFo" type="textarea" :rows="7" placeholder="请输入..."></Input>
							    	<p style="text-align:left; font-size:0.9rem; color:red;">请认真核对所写信息！提交教学日志进行签到，并且不可重复签到。</p>
							    </div>
							    <div slot="footer" style="text-align:center;">
							        <!-- <Button id="modalBtn" @click="ok(index)">提交</Button>
							        <Button id="modalBtn" @click="cancel(index)">取消</Button> -->
							    </div>
							</Modal>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data () {
		return {
			courseName: '基础护理技术',
			teachJournalDetailList: [
				{signInTime: '2016-09-06', execWeek: '1', weekdays: '2', lessonNum: '2', classroomId: '302'},
				{signInTime: '2016-09-06', execWeek: '1', weekdays: '2', lessonNum: '2', classroomId: '302'},
				{signInTime: '2016-09-06', execWeek: '1', weekdays: '2', lessonNum: '2', classroomId: '302'}
			],
			modal1: false,		// 签到窗口
			modal2: false,		// 查看上课日志窗口
			courseAssociationId: ''
			selWeekList: '',		// 选择周数下拉框
			weekList: [],
			selGiveLessonsDetailsList: '',		// 选择上课时间下拉框
			giveLessonsDetailsList: []
			// teachJournalInFo: ''	// 上传日志输入框
		}
	},
	beforeMount: function() {
		var thisURL = document.URL; 
		//分割成字符串  
        var getval =thisURL.split('?')[1];
        this.courseAssociationId = getval.split("=")[1];

        this.$http.post('./teachJournalDetailList',{
        	"courseAssociationId": this.courseAssociationId
        },{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teachJournalDetailList = data.teachJournalDetailList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 增加一行签到课程信息，需要编辑上课日志并签到当堂课程*****************************************************
		signInBtn: function () {
			this.modal1 = true;
			this.$http.post('./teachJournalSignIn',{
	        	"courseAssociationId": this.courseAssociationId
	        },{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            this.weekList = data.weekList;
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });

			// this.teachJournalDetailList.push(
   //          		{giveLessonDetailsId: 'xxxxxxx', signInTime: "2016-09-06", execWeek: "1", weekdays: "2", lessonNum: "2", classroomId: "302(classRoomId)"});
			// this.$http.post('../courseList.php',{},{
			// 	"Content-Type":"application/json"
			// }).then(function(response){
			// 	console.log("获取申请:");
			// 	console.log(response.body);
			// 	var data = response.body;
   //          	this.teachJournalDetailList.push(
   //          		{giveLessonDetailsId: "data.teachJournalDetailList.giveLessonDetailsId", signInTime: "data.teachJournalDetailList.signInTime", execWeek: "data.teachJournalDetailList.execWeek", weekdays: "data.teachJournalDetailList.weekdays", lessonNum: "data.teachJournalDetailList.lessonNum", classroomId: "data.teachJournalDetailList.classroomId"});
			// },function(error){
			// 	console.log("获取申请error:");
			// 	console.log(error);
			// });
		},
		// 选择周数并提交后，回调上课时间下拉列表*****************************************************************
		selWeekChange: function () {
			this.$http.post('./chooseCourseWeek',{
	        	"courseAssociationId": this.courseAssociationId,
	        	"execWeek": this.selWeekList
	        },{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            this.giveLessonsDetailsList = data.giveLessonsDetailsList;
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
		},
		// 点击弹出窗口编辑上课日志****************************************************************************
		tchJournal: function () {
			this.modal = true;
			// this.$http.post('../courseList.php',{},{
			// 	"Content-Type":"application/json"
			// }).then(function(response){
			// 	console.log("获取申请:");
			// 	console.log(response.body);
			// 	var data = response.body;
   //          	this.teachJournalDetailList = data.teachJournalDetailList;
			// },function(error){
			// 	console.log("获取申请error:");
			// 	console.log(error);
			// });
		},
		// 提交上课日志，同时进行签到********************************************************************************
		ok (index) {
            this.modal = false;
            this.$http.post('../courseList.php',{
            	"giveLessonDetailsId": this.teachJournalDetailList[index].giveLessonDetailsId,
            	"teachJournalInFo": this.teachJournalDetailList[index].teachJournalInFo
            },{
            	"Content-Type":"application/json"
            }).then(function(response){
            	console.log("获取申请:");
            	console.log(response.body);
            	var data = response.body;
            	this.$Message.success('签到成功！');
            },function(error){
            	console.log("获取申请error:");
				console.log(error);
            });
        },
        cancel (index) {
            this.modal = false;
            this.$Message.error('提交失败！');
        },
		// 返回到教学计划页面*****************************************************************************************
		returnBtn: function () {
			window.location.href = "#/teacher/courseList"
		}
		// affirmBtn: function () {
		// 	var redState = document.getElementById("state")
		// 	var affirmState = document.getElementById("affirmState")
		// 	var r = confirm("您确定信息无误并提交？")
		// 	if (r==true) {
		// 		alert("已提交！");
		// 		redState.innerHTML = "已确认"
		// 		redState.style.color = "black"
		// 		affirmState.removeAttribute("style")
		// 	}
		// 	else {
		// 		alert("提交失败。")
		// 	}
		// }
	}
}
</script>

<style>
#scheduleList {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.classList {
	text-align: center;
	background-color: white;
	margin: 1.5rem 5rem;
}
.textRed {
	color: red;
}
</style>