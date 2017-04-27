<template>
<div>
	<div class="curSettings">
      <div>
        <span>当前学年学期：{{year}}学年第{{semester}}学期</span>
        <span>当前周数：{{week}}</span>
        <span>请提前2天申请，若在当前时间是17：00后，则顺延一天</span>
      </div>
      <div>
        <span>任课教师：{{teacher}}</span>
        <span>提示：{{teacher}}你在【{{year}}学年第{{semester}}学期】共上【{{courseNum}}】门教学课，在调/补课时，你所选上课时段已过冲突筛选，请留意。</span>
      </div>
    </div>

	<div id="adjShow">
		<!-- 可调课程信息 -->
		<div class="adjShowDiv">
			<table class="applyTable">
				<thead>
					<tr>
						<th>请选择</th>
						<th>序号</th>
						<th>课程编号</th>
						<th>课程名称</th>
						<th>班级名称</th>
						<th>任课老师</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in courseList" :key="data">
						<td class="applyAdj">
							<a value="toggle" @click="applyAdjBtn(index)" >申请调课</a>
						</td>
						<td v-text="index + 1"></td>
						<td>{{data.courseId}}</td>
						<td :value="data.courseAssociationId">{{data.courseName}}</td>
						<td :value="data.classId">{{data.className}}</td>
						<td :value="data.teacherId">{{data.teacherName}}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- 隐藏调课选项 -->
		<div class="adjSel" v-if="isShow">
			<span class="textBlue" style="float: left; margin: 0.4rem 0.7rem;">提示：请从左往右依次选择。</span>
		    <table>
				<tbody>
					<tr>	<!-- 第一行 -->
						<td class="designation" width="8%">
							<span>原周数：</span>
						</td>
						<td class="choice" width="17%">
							<select v-model="selPreWeek">
								<option disabled>选择周数</option>
								<option v-for="preWeek in weekset" :value="preWeek">第{{ preWeek }}周</option>
							</select>
						</td>
						<td class="designation" width="8%">
							<span>原星期：</span>
						</td>
						<td class="choice" width="17%">
							<select v-model="selPerDay">
								<option disabled>选择星期</option>
								<option v-for="preDay in weekdayset" :value="preDay">星期{{ preDay }}</option>
							</select>
						</td>
						<td class="designation" width="8%">
							<span>原节次：</span>
						</td>
						<td class="choice" width="17%">
							<select v-model="selPreSection">
								<option disabled>选择节次</option>
								<option v-for="preSection in lessonNumset" :value="preSection">第{{ preSection }}节</option>
							</select>
						</td>
						<td class="designation" width="8%">
							<span>上课教室：</span>
						</td>
						<td class="choice" width="17%">
							<select v-model="selClassroom">
								<option disabled>选择上课教室</option>
								<option v-for="classroom in selectiveClassroomSet" :value="classroom">{{ classroom }}</option>
							</select>
						</td>
					</tr>
					<tr>	<!-- 第二行 -->
						<td class="designation">
							<span>调至周数：</span>
						</td>
						<td class="choice">
							<select v-model="selAdjWeek">
								<option disabled>选择周数</option>
								<option v-for="adjWeek in selectiveWeekSet" :value="adjWeek">第{{ adjWeek }}周</option>
							</select>
						</td>
						<td class="designation">
							<span>调至星期：</span>
						</td>
						<td class="choice">
							<select v-model="selAdjDay" @click="selectiveWeekdayClick()">
								<option disabled>选择星期</option>
								<option v-for="adjDay in selectiveWeekday" :value="adjDay" @change="selectiveWeekdayChange()">星期{{ adjDay }}</option>
							</select>
						</td>
						<td class="designation">
							<span>调至节次：</span>
						</td>
						<td class="choice">
							<select v-model="selAdjSection" @click="selectiveLessonNumClick()">
								<option disabled>选择节次</option>
								<option v-for="adjSection in selectiveLessonNum" :value="adjSection" @change="selectiveLessonNumChange()">第{{ adjSection }}节</option>
							</select>
						</td>
						<td class="designation">
							<span>申请理由：</span>	<!-- 50字 -->
						</td>
						<td class="choice" width="14%">
							<div style="width:10rem;">
								<Input v-model="message" type="textarea" :rows="2"></Input>
							</div>
						</td>
					</tr>
				</tbody>
		    </table>
		    <div class="submit">
		    	<button class="am-btn am-btn-success am-radius" @click="modal1 = true">提交</button>
		    	<Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
					<p style="text-align:center; font-size:1.1rem;">您确定要提交吗？</p>
					<div slot="footer" style="text-align:center;">
						<Button id="modalBtn" @click="ok1()">确定</Button>
						<Button id="modalBtn" @click="cancel1()">取消</Button>
					</div>
				</Modal>
		    	<button class="am-btn am-btn-success am-radius" @click="modal2 = true">取消</button>
		    	<Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
					<p style="text-align:center; font-size:1.1rem;">您确定不保存并取消吗？</p>
					<div slot="footer" style="text-align:center;">
						<Button id="modalBtn" @click="ok2()">确定</Button>
						<Button id="modalBtn" @click="cancel2()">取消</Button>
					</div>
				</Modal>
		    </div>
		</div>

		<!-- 已调课程信息 -->
		<div class="haveAppliedInfo">
			<table class="applyTable">
				<thead>
					<tr>
						<th>序号</th>
						<th>课程编号</th>
						<th>课程名称</th>
						<th>任课教师</th>
						<th>班级名称</th>
						<th>调整上课时间</th>
						<th>教室</th>
						<th>申请理由</th>
						<th>申请情况</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in applicationList">
						<td v-text="index + 1"></td>
						<td v-text="data.courseId"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.teacherName"></td>
						<td v-text="data.className"></td>
						<td v-text="data.lessonChangeInfo"></td>
						<td v-text="data.useClassroom"></td>
						<td v-text="data.mediationReason"></td>
						<td v-text="data.auditType"></td>
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
			year: '',
			semester: '',
			week: '',
			teacher: '',
			courseNum: '',

			isShow: false,
			//	申请调课列表原始数据
			courseList: [
				{className: '对口高职2015护理（9+3）1班', courseName: '护理管理学',courseId: '10301', teacherName: '何平（61742）'}
			],
			// 表格所选当行变量
			teacherNameGet: '',
    		courseIdGet: '',
    		courseNameGet: '',
    		classNameGet: '',
			courseAssociationIdGet: '',
			classIdGet: '',
			teacherIdGet: '',
			//	申请后所填信息展示
			applicationList: [
				// {num: '01', courseNum: '8854934', courseName: '护理学', courseTeacher: '何平', className: '对口高职2015护理（9+3）1班', appliedTime: '第一周星期一第一节调整到第二周星期二第二节', appliedClassroom: '第一教学楼202', appliedReason: '五一放假', applyState: '正在申请中'}
			],
			// 输入框
			message: '',
			// adjSel下拉选项
	        selPreWeek: '选择周数',	// 原周数
	        weekset: [
	          // { text: '选择周数', value: '0' },
	          // { text: '第一周', value: '1' }
	        ],
	        selPerDay: '选择星期',		// 原星期
	        weekdayset: [],
	        selPreSection: '选择节次',		// 原节次
	        lessonNumset: [],
	        selClassroom: '选择上课教室',		// 上课教室
	        selectiveClassroomSet: [],
	        selAdjWeek: '选择周数',	// 调至周数
	        selectiveWeekSet: [],
	        selAdjDay: '选择星期',		// 调至星期
	        selectiveWeekday: [],
	        selAdjSection: '选择节次',		// 调至节次
	        selectiveLessonNum: [],
	        // allWeekdaysAndLessonNumsList: []	// 调至星期和节次
	        modal1: false,		// 提交弹出框
	        modal2: false,		// 取消弹出框
		}
	},
  	beforeMount: function() {
        this.$http.post('./alternateLessionApplication.action',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.year = data.year;
            this.semester = data.semester;
            this.week = data.week;
            this.teacher = data.teacher;
            this.courseNum = data.courseNum;
            this.courseList = data.courseList;
            this.applicationList = data.applicationList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// weekChange: function(){
		// 	alert(this.selPreWeek);
		// },
		// 点击表格“申请调课”，显示选项内容
	    applyAdjBtn: function (index) {
	    	this.teacherNameGet = this.courseList[index].teacherName;
    		this.courseIdGet = this.courseList[index].courseId;
    		this.courseNameGet = this.courseList[index].courseName;
    		this.classNameGet = this.courseList[index].className;
	    	this.courseAssociationIdGet = this.courseList[index].courseAssociationId;
	    	this.teacherIdGet = this.courseList[index].teacherId;
	    	this.classIdGet = this.courseList[index].classId;
    		if (this.isShow == false) {
    			this.isShow = true;
    			this.$http.post('./alternateLessionApplication/application-button.action',{
    				"teacherName": this.courseList[index].teacherName,
    				"courseId": this.courseList[index].courseId,
    				"courseName": this.courseList[index].courseName,
    				"className": this.courseList[index].className,
    				"courseAssociationId": this.courseList[index].courseAssociationId,
    				"teacherId": this.courseList[index].teacherId,
    				"classId": this.courseList[index].classId
		        },{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.result == "1") {
		            	this.weekset = data.weekset;
			            this.weekdayset = data.weekdayset;
			            this.lessonNumset = data.lessonNumset;
			            this.selectiveWeekSet = data.selectiveWeekSet;
			            this.selectiveClassroomSet = data.selectiveClassroomSet;
		            }else if (data.result == "0") {
				        // alert("操作失败！请重试");
				        this.$Message.success('操作失败！请重试');
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
		        });
    		}
    		else {
    			this.isShow = true;
    		}
    	},
		// 点击调至周数，申请获得下拉数据
		selectiveWeekdayClick: function () {
			// alert(this.teacherNameGet);
			this.$http.post('./alternateLessionApplication/application-select.action',{
	        	"originWeek": this.selPreWeek,
	        	"originWeekday": this.selPerDay,
	        	"originLessonNum": this.selPreSection,
	        	"selectedClassroom": this.selClassroom,
	        	"selectedWeek": this.selAdjWeek,
	        	"teacherName": this.teacherNameGet,
				"courseId": this.courseIdGet,
				"courseName": this.courseNameGet,
				"className": this.classNameGet,
				"courseAssociationId": courseAssociationIdGet,
				"teacherId": this.teacherIdGet,
				"classId": this.classIdGet
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            for (var i = 0; i < data.allWeekdaysAndLessonNumsList.length; i++) {
	            	this.selectiveWeekday.push(data.allWeekdaysAndLessonNumsList[i][0]);
	            }
	            for (var j = 0; j < data.allWeekdaysAndLessonNumsList.length; j++) {
	            	this.selectiveLessonNum.push(data.allWeekdaysAndLessonNumsList[j][1]);
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
		},
		selectiveWeekdayChange: function () {
			this.$http.post('./alternateLessionApplication/application-select.action',{},{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            for (var i = 0; i < this.selectiveWeekday.length; i++) {
	            	if (this.selAdjDay == this.selectiveWeekday[i].value) {
	            		this.selAdjSection = this.selectiveLessonNum[i].value;
	            	}
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
		},
		// 点击调至节次，申请获得下拉数据
		selectiveLessonNumClick: function () {
			this.$http.post('./alternateLessionApplication/application-select.action',{
				"originWeek": this.selPreWeek,
	        	"originWeekday": this.selPerDay,
	        	"originLessonNum": this.selPreSection,
	        	"selectedClassroom": this.selClassroom,
	        	"selectedWeek": this.selAdjWeek,
	        	"teacherName": this.teacherNameGet,
				"courseId": this.courseIdGet,
				"courseName": this.courseNameGet,
				"className": this.classNameGet,
				"courseAssociationId": courseAssociationIdGet,
				"teacherId": this.teacherIdGet,
				"classId": this.classIdGet
	        },{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            for (var i = 0; i < data.allWeekdaysAndLessonNumsList.length; i++) {
	            	this.selectiveWeekday.push(data.allWeekdaysAndLessonNumsList[i][0]);
	            }
	            for (var j = 0; j < data.allWeekdaysAndLessonNumsList.length; j++) {
	            	this.selectiveLessonNum.push(data.allWeekdaysAndLessonNumsList[j][1]);
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
		},
		selectiveLessonNumChange: function () {
			this.$http.post('./alternateLessionApplication/application-select.action',{},{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            for (var j = 0; j < this.selectiveLessonNum.length; j++) {
	            	if (this.selAdjSection == this.selectiveLessonNum[j].value) {
	            		this.selAdjDay = this.selectiveWeekday[i].value;
	            	}
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
		},
    	// 点击“提交”按钮，选项内容提交并隐藏*******************************************************
    	// submitItBtn: function (index) {
    	// 	if (this.isShow ==true) {
    	// 		this.isShow = false;
    	// 		this.$http.post('./alternateLessionApplication/application-submit.action',{
					// "originWeek": this.selPreWeek,
		   //      	"originWeekday": this.selPerDay,
		   //      	"originLessonNum": this.selPreSection,
		   //      	"selectedClassroom": this.selClassroom,
		   //      	"selectedWeek": this.selAdjWeek,
		   //      	"selectedWeekday": this.selAdjDay,
		   //      	"selectedLessonNum": this.selAdjSection,
		   //      	"mediationReason": this.message,
		   //      	"courseId": this.courseList[index].courseId,
		   //      	"courseName": this.courseList[index].courseName,
		   //      	"className": this.courseList[index].className,
		   //      	"teacherName": this.courseList[index].teacherName,
    	// 			"courseAssociationId": this.courseList[index].courseAssociationId,
    	// 			"teacherId": this.courseList[index].teacherId,
    	// 			"classId": this.courseList[index].classId
		   //      },{
		   //          "Content-Type":"application/json"
		   //      }).then(function(response){
		   //          console.log("获取申请:");
		   //          console.log(response.body);
		   //          var data = response.body;
		   //          if (data.result == "1") {
		   //          	this.applicationList = data.applicationList
		   //          }else if (data.result == "0") {
				 //        alert("操作失败！请重试");
				 //    }
		   //      },function(error){
		   //          console.log("获取申请error:");
		   //          console.log(error);
	    //     	});
    	// 	}
    	// 	else {
    	// 		this.isShow = false;
    	// 	}
    	// },
    	ok1 (index) {
            this.modal1 = false;
            if (this.isShow ==true) {
    			this.isShow = false;
    			this.$http.post('./alternateLessionApplication/application-submit.action',{
					"originWeek": this.selPreWeek,
		        	"originWeekday": this.selPerDay,
		        	"originLessonNum": this.selPreSection,
		        	"selectedClassroom": this.selClassroom,
		        	"selectedWeek": this.selAdjWeek,
		        	"selectedWeekday": this.selAdjDay,
		        	"selectedLessonNum": this.selAdjSection,
		        	"mediationReason": this.message,
		        	"courseId": this.courseList[index].courseId,
		        	"courseName": this.courseList[index].courseName,
		        	"className": this.courseList[index].className,
		        	"teacherName": this.courseList[index].teacherName,
    				"courseAssociationId": this.courseList[index].courseAssociationId,
    				"teacherId": this.courseList[index].teacherId,
    				"classId": this.courseList[index].classId
		        },{
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.result == "1") {
		            	this.applicationList = data.applicationList;
            			this.$Message.success('提交成功！请在下方表格中查看调课信息。');
		            }else if (data.result == "0") {
				        this.$Message.success('操作失败！请重试');
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
    		}
    		else {
    			this.isShow = false;
    		}
        },
        cancel1 () {
            setTimeout(() => {
                this.modal1 = false;
                // this.$Message.error('提交失败！请重新操作。');
            }, 100);
        },
    	// 取消并不保存*********************************************************
    	// cancelBtn: function () {
    	// 	this.isShow = false;
    	// }
    	ok2 () {
            setTimeout(() => {
                this.modal2 = false;
                this.$Message.success('取消修改并未保存！');
            }, 100);
            this.isShow = false;
        },
        cancel2 () {
            setTimeout(() => {
                this.modal2 = false;
            }, 100);
        },
  	}
}
</script>

<style>
#adjShow {
    text-align: center;
    margin: 1rem 0;
}
.adjShowDiv {
	background-color: white;
}

.applyAdj a {
  color: #2c3e50;
  text-decoration: underline;
  cursor: pointer;
}
.applyAdj a:link,
.applyAdj a:hover {
	color: black;
}
.applyAdj a:active {
	color: blue;
}

/*隐藏选项内容*/
.adjSel {
    text-align: center;
    margin: 0.5rem;
}
.adjSel table {
	width: 100%;
}
.designation {
	text-align: right;
}
.choice {
	text-align: left;
}
/*.choice select {
	border-radius: 1rem;
	width: 10rem;
	height: 1.8rem;
	font-size: 0.8rem;
	outline: none;
}
select {
	cursor: pointer;
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	background: url(../../public/images/angle-down.png) no-repeat 95% 90%;
}*/
.adjSel tr {
	height: 2.7rem;
}
.adjSel td {
	position: relative;
}
.submit {
	text-align: center;
	margin-bottom: 0.7rem;
}
.submit button {
	width: 5.6rem;
	margin: 0 0.7rem;
}
</style>
