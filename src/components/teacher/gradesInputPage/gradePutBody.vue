<template>
<div>
	<div class="blank">
		<div class="lpart">		<!-- 页面跳转，返回url参数传递 -->
			<span>输入成绩课程：{{inputLesson}}</span>
			<span>上课班级：{{classes}}</span>
		</div>
		<div class="rpart">
			<span>任课老师：{{teacher}}</span>
		</div>
	</div>

	<div id="gradePutBody">
		<div class="gradePutDiv">
			<!-- <span>请输入此课程提示的【{{ number }}】个学生成绩</span> -->
			<div class="gpMain">
				<div class="submitGrade" :id="submitGrade" v-show="inputGradeRate">
					<span>比率设置：</span>
					<span>
						平时比率：<input v-model="usualRate" placeholder="20">%
					</span>
					<span>
						期中比率：<input v-model="halfRate" placeholder="20">%
					</span>
					<span>
						期末比率：<input v-model="finalRate" placeholder="50">%
					</span>
					<span>
						实验比率：<input v-model="practiceRate" placeholder="10">%
					</span>
				</div>
				<div class="select-button">
					<select v-model="scoreType" @change="scoreTypeClick()">
						<option value="1">正考成绩输入</option>
						<option value="2">补考成绩输入</option>
					</select>
					<select v-model="selExecSemster">
						<option disabled>选择学期</option>
						<option v-for="execSemsterOne in execSemster" :value="execSemsterOne.text">{{execSemsterOne.text}}</option>
					</select>
					<select v-model="selCourseName">
						<option disabled>选择课程</option>
						<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>
					</select>
					<button class="am-btn am-btn-success am-radius" @click="checkBtn()">查询</button>
					<button class="am-btn am-btn-success am-radius rightBtn" @click="exportBtn()">导出</button>
					<button class="am-btn am-btn-success am-radius rightBtn" @click="submitBtn()">提交</button>
					<button class="am-btn am-btn-success am-radius rightBtn" @click="saveAllBtn()">保存</button>
				</div>
				<!-- 正考成绩输入 -->
				<div class="scoreTable" v-if="scoreShow">
					<table class="normalTable">
						<thead>
							<tr>
								<th>学号</th>
								<th>姓名</th>
								<th>平时成绩</th>
								<th>期中成绩</th>
								<th>期末成绩</th>
								<th>实验成绩</th>
								<th>成绩备注</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(areTestScore, index) in scoreList" :id="'areTestInputTr'+index" :key="areTestScore">
								<td v-text="areTestScore.studentId"></td>
								<td v-text="areTestScore.studentName"></td>
								<td>
									<input id="input1" type="text" :value="areTestScore.ususallyGrade" readonly="true">
								</td>
								<td>
									<input id="input2" type="text" :value="areTestScore.halfGrade" readonly="true">
								</td>
								<td>
									<input id="input3" type="text" :value="areTestScore.finalGrade" readonly="true">
								</td>
								<td>
									<input id="input4" type="text" :value="areTestScore.practiceGrade" readonly="true">
								</td>
								<td v-text="areTestScore.comment"></td>
								<td :id="operation1">
									<img :id="'areTestEditImg'+index" width="25px" height="25px" src="../../public/images/edit.png" @click="editClick('areTest',index)">
					                <img :id="'areTestSaveImg'+index" width="25px" height="25px" class="saveImg" src="../../public/images/save.png" @click="saveClick('areTest',index)">
					                <img :id="'areTestRestoreImg'+index" width="25px" height="25px" class="restoreImg" src="../../public/images/restore.png" @click="restoreClick('areTest',index)">
					                <img :id="'areTestDeleteImg'+index" width="25px" height="25px" src="../../public/images/delete.png" @click="deleteClick('areTest',index)">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- 补考成绩输入 -->
				<div class="makeupScoreTable" v-else="makeupScoreShow">
					<table class="normalTable">
						<thead>
							<tr>
								<th>学号</th>
								<th>姓名</th>
								<th>补考成绩</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(makeupScore, index) in makeupScoreList" :id="'makeupInputTr'+index" :key="makeupScore">
								<td v-text="makeupScore.studentId"></td>
								<td v-text="makeupScore.studentName"></td>
								<td>
									<!-- <input v-text="data.makeupGrade"> -->
									<input id="input4" type="text" :value="makeupScore.makeupGrade" readonly="true">
								</td>
								<td :id="operation2">
									<img :id="'makeupEditImg'+index" width="25px" height="25px" src="../../public/images/edit.png" @click="editClick('makeup',index)">
					                <img :id="'makeupSaveImg'+index" width="25px" height="25px" class="saveImg" src="../../public/images/save.png" @click="saveClick('makeup',index)">
					                <img :id="'makeupRestoreImg'+index" width="25px" height="25px" class="restoreImg" src="../../public/images/restore.png" @click="restoreClick('makeup',index)">
					                <img :id="'makeupDeleteImg'+index" width="25px" height="25px" src="../../public/images/delete.png" @click="deleteClick('makeup',index)">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'gradePutBody',
	data () {
		return {
			inputLesson: '护理管理学',
			classes: '对口高职2015护理（9+3）1班+普通高中2015护理2班护理管理学多班拆分A班',
			teacher: '何平',
			scoreType: '1',		// 默认选中正考成绩
			scoreShow: true,	// 显示正考成绩
			makeupScoreShow: false,		// 隐藏补考成绩
			inputGradeRate: true,		//显示输入成绩比率
			selExecSemster: '选择学期',
			execSemster: [],
			selCourseName: '选择课程',
			courseInfo: [],
			// number: '82',	// 已有成绩学生人数
			usualRate: '',		//平时比率
			halfRate: '',		//期中比率
			finalRate: '',		//期末比率
			practiceRate: '',	//实验比率
	        // 学生正考成绩列表
			scoreList: [
				{studentId: '15303010503', studentName: '谢兴月', ususallyGrade: '98', halfGrade: '75', finalGrade: '86', practiceGrade: '96'}
			],
			// 学生补考成绩列表
			makeupScoreList: [
				// {studentId: '15303010503', studentName: '谢兴月', makeupGrade: '85'}
			],
		}
	},
	beforeMount: function() {
        this.$http.post('./findScoreByStuNo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.execSemster = data.execSemster;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
        this.$http.post('./courseManage/getCourseAndClassInfo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.courseInfo = data.courseInfo;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 选择输入成绩类型**********************************
		scoreTypeClick: function () {
			// console.log(this.scoreType);
			// 正考成绩输入
			if (this.scoreType == 1) {
				this.scoreShow = true;
				this.makeupScoreShow = false;
				this.inputGradeRate = true;
				this.$http.post('./saveScore',{},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.result == "1") {
		            	this.scoreList = data.scoreList;
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}
			// 补考成绩输入
			else if (this.scoreType == 2) {
				this.scoreShow = false;
				this.makeupScoreShow = true;
				this.inputGradeRate = false;
				this.$http.post('./saveMakeUpScore',{},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.result == "1") {
		            	this.makeUpScoreList = data.makeUpScoreList;
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}
		},
		// 查询按钮****************************
		checkBtn: function () {
			// 正考成绩查询
			if (this.scoreType == 1) {
				this.$http.post('./saveScore',{
					"execSemster": this.selExecSemster,
					"courseInfo": this.selCourseName
				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.result == "1") {
		            	this.scoreList = data.scoreList;
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}
			// 补考成绩查询
			else if (this.scoreType == 2) {
				this.$http.post('./saveMakeUpScore',{
					"execSemster": this.selExecSemster,
					"courseInfo": this.selCourseName
				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.result == "1") {
		            	this.makeUpScoreList = data.makeUpScoreList;
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}
		},
		// 保存所有数据并提交***************************
		saveAllBtn: function () {
			var inputRate = document.getElementById("submitGrade");
			var input = inputRate.getElementsByTagName("input");
			// 正考成绩保存
			if (this.scoreType == 1) {
				this.$http.post('./saveScore',{
					"usualRate": this.usualRate,
					"halfRate": this.halfRate,
					"finalRate": this.finalRate,
					"practiceRate": this.practiceRate,
					"scoreList": this.scoreList
				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
					var operation1 = document.getElementById("operation1");
		            if (data.result == "1") {
		            	var r = confirm("提交后将无法修改，您确定提交？");
		            	if (r == true) {
		            		alert("提交成功！");
		            		operation1.style.display = none;
		            		for(var i = 0;i<input.length;i++){
							    input[i].readOnly = true;
							    input[i].style.border = "none";
							}
		            	}
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}
			// 补考成绩保存
			else if (this.scoreType == 2) {
				this.$http.post('./saveMakeUpScore',{
					"makeupScoreList": this.makeupScoreList
				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            var operation2 = document.getElementById("operation2");
		            if (data.result == "1") {
		            	var r = confirm("提交后将无法修改，您确定提交？");
		            	if (r == true) {
		            		alert("提交成功！");
		            		operation2.style.display = none;
		            	}
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}
		},
		// 点击提交后，成绩无法修改**************
		submitBtn: function () {
			// 正考成绩提交
			if (this.scoreType == 1) {
				this.$http.post('./saveScore',{
					"usualRate": this.usualRate,
					"halfRate": this.halfRate,
					"finalRate": this.finalRate,
					"practiceRate": this.practiceRate,
					"scoreList": this.scoreList
				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
					var operation1 = document.getElementById("operation1");
		            if (data.result == "1") {
		            	var r = confirm("提交后将无法修改，您确定提交？");
		            	if (r == true) {
		            		alert("提交成功！");
		            		operation1.style.display = none;
		            	}
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}
			// 补考成绩提交
			else if (this.scoreType == 2) {
				this.$http.post('./saveMakeUpScore',{
					"makeupScoreList": this.makeupScoreList
				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            var operation2 = document.getElementById("operation2");
		            if (data.result == "1") {
		            	var r = confirm("提交后将无法修改，您确定提交？");
		            	if (r == true) {
		            		alert("提交成功！");
		            		operation2.style.display = none;
		            	}
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}
		},
		// 导出成绩单********************************************************
		exportBtn: function () {

		},

		// 编辑功能*****************************************************
		editClick: function(type,index){
            var inputTr = document.getElementById(type+"InputTr"+index);
            var input = inputTr.getElementsByTagName("input");
            var editImg = document.getElementById(type+"EditImg"+index);
            var saveImg = document.getElementById(type+"SaveImg"+index);
            var restoreImg = document.getElementById(type+"RestoreImg"+index);
            var deleteImg = document.getElementById(type+"DeleteImg"+index);
            var i = null;
			// 使课程信息的输入标签变为可输入，显示边框
            for(i = 0;i<input.length;i++){
              input[i].readOnly = false;
              input[i].style.border = "0.1rem solid #d4d4d9";
            }
			// 隐藏编辑和删除功能图标,显示保存和重置功能图标
            editImg.style.display = "none";
            saveImg.style.display = "inline";
            deleteImg.style.display = "none";
            restoreImg.style.display = "inline";
        },
        // 取消修改,重置数据,退出编辑
        restoreClick: function(type,index){
            if(confirm("您确定取消编辑并重置该学生成绩信息吗？")){
              var inputTr = document.getElementById(type+"InputTr"+index);
              var input = inputTr.getElementsByTagName("input");
              var editImg = document.getElementById(type+"EditImg"+index);
              var saveImg = document.getElementById(type+"SaveImg"+index);
              var restoreImg = document.getElementById(type+"RestoreImg"+index);
              var deleteImg = document.getElementById(type+"DeleteImg"+index);
              var i = null;
				// 重置数据到value,虽然input的value和data中的属性绑定,但并不是完全的双向,此时data中的属性数据并没有发生修改
               if (type == "areTest") {
                input[0].value = this.scoreList[index].ususallyGrade;
                input[1].value = this.scoreList[index].halfGrade;
                input[2].value = this.scoreList[index].finalGrade;
                input[3].value = this.scoreList[index].practiceGrade;
               }
               else if (type == "makeup") {
               	input[0].value = this.makeupScoreList[index].makeupGrade;
               }
				// 使课程信息的输入标签变为不可输入，隐藏边框
              for(i = 0;i<input.length;i++){
                input[i].readOnly = true;
                input[i].style.border = "none";
              }
              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg.style.display = "none";
            }
        },
        // 删除功能
        deleteClick: function(type,index){
			// 从data中的课程信息数组中删除
			// 预留功能,将data提交到后端,实现删除数据,处理回调
            if (type == "areTest") {
            	if(confirm("您确定删除该学生正考成绩吗？")){
	              this.scoreList.splice(index, 1);
	            }
            }
            else if (type == "makeup") {
            	if(confirm("您确定删除该学生补考成绩吗？")){
	              this.makeupScoreList.splice(index, 1);
	            }
            }
        },
        // 保存功能
		saveClick: function(type,index){
			if(confirm("您确定提交保存该学生成绩吗？")){
			  var inputTr = document.getElementById(type+"InputTr"+index);
			  var input = inputTr.getElementsByTagName("input");
			  var editImg = document.getElementById(type+"EditImg"+index);
			  var saveImg = document.getElementById(type+"SaveImg"+index);
			  var restoreImg = document.getElementById(type+"RestoreImg"+index);
			  var deleteImg = document.getElementById(type+"DeleteImg"+index);
			  var i = null;
			// 保存数据到data,虽然input的value和data中的属性绑定,但并不是完成的双向,此时data中的属性数据并没有发生修改
			if (type == "areTest") {
			   	this.scoreList[index].ususallyGrade = input[0].value;
			    this.scoreList[index].halfGrade = input[1].value;
			    this.scoreList[index].finalGrade = input[2].value;
			    this.scoreList[index].practiceGrade = input[3].value;
			    this.$http.post('./saveScore',{
					"scoreList": this.scoreList
				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            // console.log(response.body);
		            // var data = response.body;
					alert("保存成功！");
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}else if (type == "makeup") {
			   	this.makeupScoreList[index].makeupGrade = input[0].value;
			   	this.$http.post('./saveMakeUpScore',{
					"makeupScoreList": this.makeupScoreList
				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
					alert("保存成功！");
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
			}
			for(i = 0;i<input.length;i++){
			    input[i].readOnly = true;
			    input[i].style.border = "none";
			}
			  editImg.style.display = "inline";
			  saveImg.style.display = "none";
			  deleteImg.style.display = "inline";
			  restoreImg.style.display = "none";
			}
		}
	}
}
</script>

<style>
#gradePutBody {
	background-color: #f3f3f3;
}
.gradePutDiv {
	padding: 1rem 2rem;
}
.gradePutDiv span {
	margin: 0 3rem;
}
.gpMain {
	background-color: white;
	margin: 0.5rem 3rem;
	padding-bottom: 1.3rem;
}
/*成绩比率设置*/
.submitGrade {
	/*padding: 0.9rem 0;*/
	text-align: center;
	padding-top: 1rem;
	width: 100%;
	font-size: 0.9rem;
}
.submitGrade span {
	margin-left: 2rem;
	margin-right: 2rem;
}
.submitGrade input {
	width: 2.5rem;
}
/*筛选，按钮*/
.select-button {
	margin: 1rem 2rem;
	margin-top: 0;
    padding-top: 1rem;
}
.select-button select {
	margin-right: 1.4rem;
}
.select-button button {
	margin: 0 0.7rem;
	width: 5.6rem;
}
.rightBtn {
	float: right;
}
/*学生成绩比率表格*/
.scoreTable,
.makeupScoreTable {
	margin: 0.5rem 2rem;
}
.scoreTable input,
.makeupScoreTable input {
	outline:none;
    border: none;
    margin: 0;
    text-align: center;
}
.scoreTable img,
.makeupScoreTable img {
	cursor: pointer;
	margin: 0 0.3rem;
	vertical-align: bottom;
}

/*保存功能图标*/
.saveImg{
  display: none;
}
/*重置功能图标*/
.restoreImg{
  display: none;
}

</style>