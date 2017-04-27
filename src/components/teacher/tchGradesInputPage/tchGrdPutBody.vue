<template>
<div>
	<div class="blank">
		<div class="leftPart">
			<span>当前学年学期：</span>
			<span class="textBlue">{{preSemester}}</span>
		</div>
		<div class="rightPart">
			<span>温馨提示：</span>
			<span class="textBlue">按排课信息输入成绩（若单科成绩输入时间长，请15分钟保持一次）</span>
		</div>
	</div>

	<div id="tchGrdPutBody">
		<div class="tchGrdPutDiv">
			<!-- <span>何老师，你在【2016-2017学年第一学期】共上【4】门课</span> -->
			<div class="tchGpMain">
				<div class="tchGrdTable">
					<table class="operationTable">
						<thead>
							<tr>
								<th width="7%">输入</th>
								<th width="5%">序号</th>
								<th width="12%">学年学期</th>
								<th width="11%">教师</th>
								<th width="34%">班级名称</th>
								<th width="10%">课程名称</th>
								<th width="9%">导出成绩</th>
							</tr>
						</thead>				
						<tbody>
							<tr v-for="(data, index) in info" >
								<td class="textBtn"><a :value="courseAssociationId" @click="gradeInputBtn">成绩输入</a></td>
								<td v-text="index + 1"></td>
								<td v-text="data.semester"></td>
								<td v-text="data.tchName"></td>
								<td v-text="data.className"></td>
								<td v-text="data.courseName"></td>
								<td class="textBtn"><a @click="exportFormatBtn">下载</a></td>
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
	name: 'tchGrdPutBody',
	data () {
		return {
			preSemester: '2016-2017年第一学期',
			// warmPrompt: '按排课信息输入成绩（若单科成绩输入时间长，请15分钟保持一次）',
			info: [
				{semester: '2016-2017学年第一学期', tchName: '何平', className: '对口高职2015护理（9+3）1班+普通高中2015护理2班护理管理学多班拆分A班', courseName: '护理管理学'}
			],
			courseAssociationId: ''
		}
	},
	beforeMount: function() {
        this.$http.post('../tchGradesInput.php',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.preSemester = data.preSemester;
			this.preWeek = data.preWeek;
			this.info = data.info;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 点击“成绩输入”，页面跳转
		gradeInputBtn: function () {
			this.$http.post('./saveScore',{
				"courseAssociationId": this.courseAssociationId
			},{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            window.location.href = "/teacher/gradesInput";
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
		},
		// 导出功能--待完善
		exportFormatBtn: function () {
			var r = confirm("您确定将文件导出格式吗？");
			if (r==true) {
				alert("导出成功！");
			}
			else {
				alert("导出失败。");
			}
		}
	}
}
</script>

<style>
#tchGrdPutBody {
	background-color: #f3f3f3;
}
.tchGrdPutDiv {
	padding: 0.6rem 0;
	text-align: center;
	font-size: 1rem;
}
.tchGpMain {
	text-align: center;
	background-color: white;
	margin: 0.5rem 5rem;
	padding-bottom: 1.3rem;
	border: 1px solid #ececec;	/*新加*/
}
.tchGrdTable {
	margin: 0.5rem 0.5rem;
	/*height: 20rem;*/
	border: 0.7rem solid transparent;
}
.tchGrdTable table {
	border-collapse: collapse;
	/*height: 3.2rem;*/
}

/*.textBtn a {
	text-decoration: underline;
	color: #3399ff;
	cursor: pointer;
}
.textBtn a:hover,
.textBtn a:focus {
	color: #5cadff;
}
.textBtn a:active {
	color: #3091f2;
}*/
</style>