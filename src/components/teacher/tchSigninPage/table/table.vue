<template>
<div>
	<div class="positionBar">
		<span>您的当前位置：</span>
		<span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
		<!-- <span> > <a href="#/login/main/eduAdminHome?teacher" class="returnHome">教学管理</a></span> -->
		<span> > <a href="#/teacher/teach/courseList" class="returnHome">教师签到</a></span>
		<span> > 签到列表</span>
	</div>
	<div class="spanButton">
		<div class="lpart">
			<span class="textWeight">【{{courseName}}】	{{className}}</span>
        	<span class="textBlue">（注：请在上课后五天内填写）</span>
        </div>
        <div class="rpart">
			<button class="am-btn am-btn-success am-radius rightBtn" @click="returnBtn()">返回</button>
		</div>
			<!-- <button class="am-btn am-btn-success am-radius rightBtn" @click="signInBtn()">签到</button>
			弹窗签到
			<Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
			    <div slot="header" style="font-size:1.6rem; text-align:center; padding:0.2rem 0;" id="modalHeader">
		            <span>上课日志</span>
		        </div>
			    <div style="text-align:center; font-size:1.1rem;">
			    	<span class="modal-select">
				    	<select v-model="selWeekList" @change="selWeekChange()">
							<option disabled value="">选择周数</option>
							<option v-for="weekListOne in weekList" :value="weekListOne">{{weekListOne}}</option>
						</select>
						<select v-model="selGiveLessonsDetailsList">
							<option disabled value="">选择上课时间</option>
							<option v-for="detailsOne in giveLessonsDetailsList" :value="detailsOne.giveLessonsDetailsId">{{detailsOne.timeandplaceInfo}}</option>
						</select>
					</span>
			    	<Input v-model="teachJournalInFoInput" type="textarea" :rows="7" placeholder="请输入..."></Input>
			    	<p style="text-align:left; font-size:0.9rem; color:red;">请认真核对所写信息！提交教学日志进行签到，并且不可重复签到。</p>
			    </div>
			    <div slot="footer" style="text-align:center;">
			        <Button id="modalBtn" @click="ok()">提交</Button>
			        <Button id="modalBtn" @click="cancel()">取消</Button>
			    </div>
			</Modal> -->

		<!-- 二次确认提交 -->
		<!-- <Modal v-model="modalSubmit" id="modalBody" :styles="{top:'10rem'}">
		    <p style="text-align:center; font-size:1.1rem;">您确定要提交吗？</p>
		    <div slot="footer" style="text-align:center;">
		        <Button id="modalBtn" @click="submitOk()">确认</Button>
		        <Button id="modalBtn" @click="submitCancel()">取消</Button>
		    </div>
		</Modal> -->
	</div>

	<!-- 已签到上课列表 -->
	<div id="scheduleList">
		<div class="classList">
			<table class="normalTable">
				<thead>
					<tr>
						<td width="5%">周数</td>
						<td width="5%">星期</td>
						<td width="20%">上课节数</td>
						<td width="20%">教室</td>
						<td width="10%">签到日期</td>
						<td width="10%">出勤情况</td>
						<td width="10%">教学日志</td>
						<td width="7%">状态</td>
						<td width="7%">签到</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in teachJournalDetailList">
						<td :value="data.giveLessonsDetailsId">{{data.execWeek}}</td>
						<td>{{data.weekdays}}</td>
						<td>第 {{data.lessonNum}} 大节</td>
						<td>{{data.classroomId}}</td>
						<td>{{data.signDate}}</td>
						<td class="textBtn">
							<a :id="'attendance'+index" @click="attend(index)" v-show="attendShow">考勤</a>
							<a :id="'seeAttendance'+index" @click="seeAttend(index)" v-show="seeAttendShow">查看考勤</a>
							<Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
							    <div slot="header" style="font-size:1.6rem; text-align:center; padding:0.2rem 0;" id="modalHeader">
						            <span>出勤情况</span>
						        </div>
							    <div style="text-align:center; font-size:0.8rem;">
							    	<!-- 弹窗形式编辑出勤情况并提交 -->
							    	<div v-if="attendStatus==='0'" style="overflow: auto; height: 13rem;">
							    		<ul>
							    			<li v-for="stuData in attendanceStudentList">
							    				<input type="checkbox" :value="stuData.studentId" v-model="attendanceReturn">
							    				<label :for="stuData.studentId">{{stuData.studentName}}({{stuData.studentId}})</label>
							    			</li>
							    		</ul>
					    			</div>
									<!-- 弹窗形式查看考勤 -->
									<div v-else-if="attendStatus==='1'" style="overflow: auto; height: 13rem;">
							    		<span>{{data.attendanceInfo}}</span>
							    	</div>
							    </div>
							    <div slot="footer" style="text-align:center;">
							        <Button id="modalBtn" @click="attendOk()">确认</Button>
							        <Button v-if="attendStatus==='0'" id="modalBtn" @click="attendCancel()">取消</Button>
							    </div>
							</Modal>
						</td>
						<td class="textBtn">
							<a :id="'journal'+index" @click="journal(index)" v-show="journalShow">上课日志</a>
							<a :id="'seeJournal'+index" @click="seeJournal(index)" v-show="seeJournalShow">查看日志</a>
							<Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
							    <div slot="header" style="font-size:1.6rem; text-align:center; padding:0.2rem 0;" id="modalHeader">
						            <span>上课日志</span>
						        </div>
							    <div style="text-align:center; font-size:0.9rem;">
							    	<!-- 弹窗形式编辑上课日志并提交 -->
							    	<div v-if="journalStatus==='0'">
							    		<Input v-model="teachJournalInFoInput" type="textarea" :rows="7" placeholder="请输入..."></Input>
					    				<p style="text-align:left; font-size:0.9rem; color:red;">请认真核对所写信息！提交教学日志进行签到，并且不可重复签到。</p>
					    			</div>
									<!-- 弹窗形式查看所编辑的上课日志 -->
									<div v-else-if="journalStatus==='1'">
							    		<span>{{data.teachJournalInFo}}</span>
							    	</div>
							    </div>
							    <div slot="footer" style="text-align:center;">
							        <Button id="modalBtn" @click="journalOk()">确认</Button>
							        <Button v-if="journalStatus==='0'" id="modalBtn" @click="journalCancel()">取消</Button>
							    </div>
							</Modal>
						</td>
						<td :value="data.signInStatus"><span :id="'status'+index">未确认</span></td>
						<td class="textBtn" :id="'signinBtn'+index"><button @click="signInBtn(index)">确认</button></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- 签到确认弹窗 -->
	<Modal v-model="modalSignin" id="modalBody" :styles="{top:'10rem'}">
	    <p style="text-align:center; font-size:1.1rem;">您确认签到该堂课吗？</p>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="submitOk()">确认</Button>
	        <Button id="modalBtn" @click="submitCancel()">取消</Button>
	    </div>
	</Modal>

	<!-- 操作结果提示 -->
	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="remindResult === '1'">签到失败！</p>
		    <p v-else-if= "remindResult === '2'">{{reminder}}</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	data () {
		return {
			courseName: '',
			className: '',
			teachJournalDetailList: [
				{signDate: '2016-09-06', execWeek: '1', weekdays: '2', lessonNum: '2', classroomId: '302'},
				{signDate: '2016-09-06', execWeek: '1', weekdays: '2', lessonNum: '2', classroomId: '302'}
			],
			modal1: false,		// 签到窗口
			modal2: false,		// 查看上课日志窗口
			courseAssociationId: '',
			// selWeekList: '',		// 选择周数下拉框
			// weekList: [],
			// selGiveLessonsDetailsList: '',		// 选择上课时间下拉框
			// giveLessonsDetailsList: [],
			teachJournalInFoInput: '',	// 上传日志输入框
			// checkTeachJournalInFo: '',	// 查看上课日志
			modalResult: false,
			remindResult: '',
			reminder: '',
			modalSignin: false,
			attendStatus: '',	// 考勤状态
			journalStatus: '',	// 上课日志状态
			attendanceStudentList: [
				{studentName:'小白',studentId:'2014220101'},{studentName:'小白',studentId:'201422011'},{studentName:'小白',studentId:'201420101'},{studentName:'小白',studentId:'201422101'}
			],	// 出勤情况选择
			attendanceReturn: [],
			attendShow: true,
			journalShow: true,
			seeAttendShow: false,
			seeJournalShow: false,
			index: ''
		}
	},
	beforeMount: function() {
		//分割成字符串，获取courseAssociationId
		var thisURL = document.URL;
        var getval =thisURL.split('?')[1];
        var keyValue = getval.split('&'); 
        // this.courseAssociationId = getval.split("=")[1];
        this.courseAssociationId = keyValue[0].split("=")[1];
        this.courseName = decodeURIComponent(keyValue[1].split("=")[1]);
        this.className = decodeURIComponent(keyValue[2].split("=")[1]);
        // 获取已签到课程列表
        this.$http.post('./teachJournalDetailList',{
        	"courseAssociationId": this.courseAssociationId
        },{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teachJournalDetailList = data.teachJournalDetailList;
            // 判断每一堂课是否已签到，若签到状态为1，则状态“未确认”变为“已确认”
            for (var i = 0; i < this.teachJournalDetailList.length; i++) {
            	if (this.teachJournalDetailList[i].signInStatus == '1') {
            		var status = document.getElementById("status"+i);
            		var attendance = document.getElementById("attendance"+i);
            		var seeAttendance = document.getElementById("seeAttendance"+i);
            		var journal = document.getElementById("journal"+i);
            		var seeJournal = document.getElementById("seeJournal"+i);
            		status.innerHTML = "已确认";
            		attendance.style.display = "none";
            		seeAttendance.style.display = "inline-block";
            		journal.style.display = "none";
            		seeJournal.style.display = "inline-block";
            		// 确认按钮失效，不可点击签到
            		var signinBtn = document.getElementById("signinBtn"+i);
            		var signInButton = signinBtn.getElementsByTagName("button");
            		signInButton.disabled = true;
            	}
            }
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 返回到教师签到页面
		returnBtn: function () {
			window.location.href = "#/teacher/teach/normalSchedule"
		},
		// 编辑出勤情况按钮********************************************************
		attend: function (index) {
			this.modal1 = true;
			this.attendStatus = '0';
			this.$http.post('./getAttendanceStudent',{
	        	"giveLessonsDetailsId": this.teachJournalDetailList[index].giveLessonsDetailsId
	        },{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            this.attendanceStudentList = data.attendanceStudentList;
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
		},
		// 查看出勤情况**********************************************************************************
		seeAttend: function (index) {
			this.modal1 = true;
			this.attendStatus = '1';
		},
		// 编辑上课日志按钮*********************************************************
		journal: function (index) {
			this.modal2 = true;
			this.journalStatus = '0';
            // this.checkTeachJournalInFo = this.teachJournalDetailList[index].teachJournalInFo;
		},
		// 查看上课日志**********************************************************************************
		seeJournal: function (index) {
			this.modal2 = true;
			this.journalStatus = '1';
		},
		// 签到确认按钮************************************************************************************
		signInBtn: function (index) {
			this.modalSignin = true;
			this.index = index;
			// this.$http.post('./teachJournalSignIn',{
	  //       	"courseAssociationId": this.courseAssociationId
	  //       },{
	  //           "Content-Type":"application/json"
	  //       }).then(function(response){
	  //           console.log("获取申请:");
	  //           console.log(response.body);
	  //           var data = response.body;
	  //           this.weekList = data.weekList;
	  //       },function(error){
	  //           console.log("获取申请error:");
	  //           console.log(error);
	  //       });
		},
		// 二次确认签到**************************************************
		submitOk: function () {
        	this.modalSignin = false;
			this.$http.post('./signInCourseByTeacher',{
            	"execWeek": this.teachJournalDetailList[this.index].execWeek,
            	"giveLessonsDetailsId": this.teachJournalDetailList[this.index].giveLessonsDetailsId,
            	"attendanceStudentList": this.attendanceReturn,
            	"teachJournalInFo": this.teachJournalInFoInput
            },{
            	"Content-Type":"application/json"
            }).then(function(response){
            	console.log("获取申请:");
            	console.log(response.body);
            	var data = response.body;
            	var detail = response.body.teachJournalDetail;
            	this.modalSubmit = false;
            	if (data.result == 1) {
            		this.$Message.success('签到成功！');
            	}else {
            		// this.$Message.error(data.result);
            		this.modalResult = true;
            		this.remindResult = '2';
            		this.reminder = data.result;
            	}
            },function(error){
            	console.log("获取申请error:");
				console.log(error);
            });
        },
        // 提交取消，返回签到弹窗*****************************************
		submitCancel: function () {
			this.modalSignin = false;
		},
    	resultOk: function () {
    		this.modalResult = false;
    	}
	}
}
</script>

<style scoped>
.lpart span {
	margin-right: 1rem;
}
.lpart {
  margin: 0 5rem;
  float: left;
}
.rpart {
  margin: 0 5rem;
  float: right;
}

.spanButton {
	width: 100%;
	height: 3.5rem;
    line-height: 3.5rem;
	position: relative;
	display: inline-block;
	overflow: hidden;
}
.spanButton button {
	width: 5.6rem;
    margin: 0 0.7rem;
    outline: none;
}
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
.modal-select select {
	float: left;
	margin: 0 0.6rem 1.4rem 1.4rem;
}
button {
	cursor: pointer;
}
ul {
	overflow:hidden;
	width:100%;
	padding: 0;
	padding-left: 1rem;
	text-align: left;
}
ul li {
	width:33.333%;
	float:left;
}
</style>