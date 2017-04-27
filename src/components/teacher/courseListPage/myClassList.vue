<template>
<div>
	<div class="blank">
        <div class="lpart">
            <span class="textWeight">我的上课列表</span>
        	<span class="textBlue">（注：请在上课后五天内填写）</span>
        </div>
        <div class="rpart">
        	<span>{{semester}}</span>
        </div>
    </div>

	<div id="myClassList">
		<div class="myCourseList">
			<table class="operationTable">
				<thead>
					<tr>
						<th width="17%">课程名称</th>
						<th width="12%">计划课时</th>
						<th width="12%">已上课时</th>
						<th width="12%">签到</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in teacherSignInfo">
						<td class="textBtn">{{data.courseName}}</td>
						<td>{{data.courseTotalHours}}</td>
						<td>{{data.coursedHours}}</td>
						<td class="textBtn" v-for="dataInfo in data.teacherSign">
							<a id="signIn" @click="signIn()">签到</a>
							<!-- <Button @click="modal1 = true" id="modalBtn">签到</Button> -->
							<Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
							    <div style="text-align:left; font-size:1.1rem;">
							    	<p>{{dataInfo.courseDate}}</p>
							    	<p>第{{dataInfo.weekNum}}周星期{{dataInfo.weekDay}}{{dataInfo.courseTime}}节</p>
							    	<p>{{dataInfo.courseAddress}}</p>
							    </div>
							    <div slot="footer" style="text-align:center;">
							        <Button id="modalBtn" @click="ok">确定</Button>
							        <Button id="modalBtn" @click="cancel">取消</Button>
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
	name: 'myClassList',
	data () {
		return {
			semester: '',
			modal1: false,
			teacherSignInfo: [
				{courseName: '基础护理技术', courseTotalHours: '76', coursedHours: '12',
					teacherSign:[
						{courseDate:"",weekNumL:"",weekDay:"",courseTime:"",courseAddress:""}
				]
			}
				// {courseName: '基础护理技术', plannedClass: '76', haveBeenClass: '12'},
				// {courseName: '护理学', plannedClass: '76', haveBeenClass: '8'},
				// {courseName: '护理学', plannedClass: '76', haveBeenClass: '8'}
			]
		}
	},
	beforeMount: function() {
        this.$http.post('../courseList.php',{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.semester = data.semester;
            this.teacherSignInfo = data.teacherSignInfo;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 签到按钮
		signIn: function() {
			this.modal1 = true;
			this.$http.post('../courseList.php',{},{
				"Content-Type":"application/json"
			}).then(function(response){
				console.log("获取申请:");
				console.log(response.body);
				var data = response.body;
            	this.teacherSign = data.teacherSign;
			},function(error){
				console.log("获取申请error:");
				console.log(error);
			});
		},
		// modal1按钮控件
        ok () {
            this.modal_loading = true;
            setTimeout(() => {
                this.modal_loading = false;
                this.modal1 = false;
                this.$Message.success('提交成功！');
                this.$http.post('../courseList.php',{},{
                	"Content-Type":"application/json"
                }).then(function(response){
                	console.log("获取申请:");
                	console.log(response.body);
                	var data = response.body;
                	this.coursedHours = data.coursedHours;
                },function(error){
                	console.log("获取申请error:");
					console.log(error);
                });
            }, 100);
        },
        cancel () {
            this.modal_loading = true;
            setTimeout(() => {
                this.modal_loading = false;
                this.modal1 = false;
                this.$Message.error('提交失败！');
            }, 100);
        }
	}
}
</script>

<style>
#myClassList {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.myCourseList {
	text-align: center;
	background-color: white;
	margin: 1.5rem 5rem;
}
/*.classTable {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  border: none;
}
.classTable > thead > tr > th,
.classTable > tbody > tr > th,
.classTable > thead > tr > td,
.classTable > tbody > tr > td {
  padding: 0.4rem 0rem;
  line-height: 1.6;
  vertical-align: middle;
}
.classTable th {
  font-size: 0.9rem;
  font-weight: bold;
  background-color: white;
  height: 2rem;
}
.classTable td {
  font-size: 0.5rem;
  height: 2rem;
}
.classTable > thead > tr > th {
  /*vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
*/</style>