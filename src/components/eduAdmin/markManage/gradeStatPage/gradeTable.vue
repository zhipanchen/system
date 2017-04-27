<template>
<div>	
	<div class="tableSelect">
		<select v-model="selGradeType">
			<option disabled>选择年制</option>
			<option v-for="gradeTypeOne in gradeType" :value="gradeTypeOne.value">{{gradeTypeOne.text}}</option>
		</select>
		<select v-model="selExecSemster">
			<option disabled>选择学期</option>
			<option v-for="execSemsterOne in execSemster" :value="execSemsterOne">{{execSemsterOne}}</option>
		</select>
		<select v-model="selSpecialityName">
			<option disabled>选择专业</option>
			<option v-for="specialityNameOne in specialityName" :value="specialityNameOne">{{specialityNameOne}}</option>
		</select>
		<select v-model="selCourseName">
			<option disabled>选择课程</option>
			<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>
		</select>
        <span class="inputFraction">
	        <input v-model="minScore" class="inputGrade">分 — 
	       	<input v-model="maxScore" class="inputGrade">分
	    </span>
        <button class="am-btn am-btn-success am-radius" @click="inquireBtn()">查询</button>
		<button class="am-btn am-btn-success am-radius" v-on:click="exportBtn()">下载</button>
	</div>

	<div id="gradeTable">
		<div class="gradeTableBody">
			<table class="normalTable">
				<thead>
					<tr>
						<th>学号</th>
						<th>姓名</th>
						<th>年级</th>
						<th>专业</th>
						<th>学期</th>
						<th>课程</th>
						<th>分数</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in scoreList">
						<td v-text="data.studentId"></td>
						<td v-text="data.studentName"></td>
						<td v-text="data.term"></td>
						<td v-text="data.specialityName"></td>
						<td v-text="data.stuSemester"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.grade"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'gradeTable',
	data () {
		return {
			selGradeType: '选择年制',
			selExecSemster: '选择学期',
			selSpecialityName: '选择专业',
			selCourseName: '选择课程',
			gradeType: [
				{text: '三年制', value: '3'},
				{text: '五年制', value: '5'}
			],
			execSemster: [
				"2016-2017学年第一学期"
			],
			specialityName: [
				"护理学"
			],
			courseInfo: [
				{courseName: '护理学', courseId: '123456'}
			],
			minScore: '',
			maxScore: '',
			// 返回学生成绩列表
			scoreList: [
				// {stuNum: '20142201010', stuName: '何平', stuGrade: '大二', stuMajor: '护理学', stuSemester: '2016-2017第一学期', stuCourse: '护理学', stuScore: '80'}
				{},{},{}
			]
		}
	},
	beforeMount: function() {
        this.$http.post('./findScore',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.execSemster = data.execSemster;
            this.specialityName = data.specialityName;
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
    	// 查询按钮
		inquireBtn: function() {
    		this.$http.post('./findScore',{
	        	"gradeType": this.selGradeType,
	        	"execSemster": this.selExecSemster,
	        	"specialityName": this.selSpecialityName,
	        	"courseId": this.selCourseName,
	        	"minScore": this.minScore,
	        	"maxScore": this.maxScore
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
    	},
    	// 导出按钮
		exportBtn: function () {

  		}
	}
}
</script>

<style>
#gradeTable {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
}
.gradeTableBody {
	padding: 1rem 5rem;
}
.gradeTableBody select {
	margin: 0 1rem;
}
/*.gradeTableBody table {
	margin-bottom: 1.6rem;
}*/

</style>
