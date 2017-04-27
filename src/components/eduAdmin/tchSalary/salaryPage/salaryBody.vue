<template>
<div>
	<div class="tableSelect">
      <input v-model="teacherName" placeholder="教师姓名" @change="inputSearch()">
      <button class="am-btn am-btn-success am-radius" @click="searchBtn()">查询</button>
      <button class="am-btn am-btn-success am-radius" @click="exportTemplateBtn()">下载模板</button>
      <button class="am-btn am-btn-success am-radius buttonPart" @click="exportBtn()">导出</button>
      <button class="am-btn am-btn-success am-radius buttonPart" @click="inportBtn()">导入</button>
    </div>

	<div id="salaryBody">
		<div class="salaryContent">
			<table class="normalTable">
				<thead>
					<tr>
						<th width="">教师编码</th>
						<th width="">教师姓名</th>
						<th width="">职称</th>
						<th width="">所授课程</th>
						<th width="">课时</th>
						<th width="">课酬/课时</th>
						<th width="">总课酬</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in coursePay">
						<td v-text="data.teacherId"></td>
						<td v-text="data.teacherName"></td>
						<td v-text="data.jobName"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.courseHours"></td>
						<!-- <td class="textBtn"><a @click="periodBtn">{{data.period}}</a></td> -->
						<td v-text="data.coursePayroll"></td>
						<td v-text="data.totalCoursePay"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'salaryBody',
	data () {
		return {
			teacherName: '',
			coursePay: [
				{}
			]
		}
	},
	beforeMount: function() {
        this.$http.post('../eduSalary.php',{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.coursePay = data.coursePay;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 输入教师姓名后，进行查找
		inputSearch: function () {
			// alert(this.teacherName);
			this.$http.post('../eduSalary.php',{
				"teacherName": this.teacherName
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if(data.result == "1") {
                    this.coursePay = data.coursePay;
                }else {
                    alert("操作失败！请重试");
                }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
		},
		// 查询按钮
		searchBtn: function () {
			this.$http.post('../eduSalary.php',{
				"teacherName": this.teacherName
			},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if(data.result == "1") {
                    this.coursePay = data.coursePay;
                }else if (data.result == "2") {
                    alert("操作失败！请重试");
                }else if (data.result == "0") {
                	alert("等待申请...");
                }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
	    }, 
	    // 上传按钮
	    inportBtn: function () {

	    },
	    // 下载按钮
	    exportBtn: function () {

	    }, 
	    // 下载模板按钮
	    exportTemplateBtn: function () {

	    }  
	}
}
</script>

<style>
#salaryBody {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.salaryContent {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}

</style>