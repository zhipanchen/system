<template>
	<div id="cancelContent">
		<div class="cancelContentBody">
			<table class="operationTable">
				<thead>
					<tr>
						<th width="14%">课程编号</th>
						<th width="14%">课程名称</th>
						<th width="14%">教师编号</th>
						<th width="14%">上传教师</th>
						<th width="16%">上传时间</th>
						<th width="14%">查看</th>
						<th width="14%">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in scoreUnloadList" :key="data">
						<td v-text="data.classNum"></td>
						<td v-text="data.className"></td>
						<td v-text="data.teacherNum"></td>
						<td v-text="data.teacher"></td>
						<td v-text="data.time"></td>
						<td v-text="data.check"></td>
						<td class="textBtn">
							<ul>
								<li><a @click="checkClick(index)">查看</a></li>
								<li><a @click="backoutClick(index)">撤销</a></li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'cancelContent',
	data () {
		return {
			scoreUnloadList: [
				{classNum: '010203', className: '护理学', teacherNum: '010203', teacher: '何平', time: '06.01.23 12:55', check: '未查看'}
				// {classNum: '010203', className: '基础护理学', teacherNum: '010203', teacher: '何平', time: '06.01.23 12:55', check: '未查看'}
			]
		}
	},
	beforeMount: function () {
		this.$http.post('../readjson.php').then(function (response) {
			console.log(response);
			this.scoreUnloadList = response.body.scoreUnloadList;
		});
	},
  	methods: {
  		checkClick: function (index) {
			var r = confirm("是否同意？")
			if (r==true) {
				alert("已通过！");
				this.scoreUnloadList[index].check="已通过"
			}
  		},
  		backoutClick: function (index) {
			var r = confirm("是否撤销成绩提交？")
			if (r==true) {
				alert("已撤回！");
				this.scoreUnloadList.splice(index,1)
			}
  		}
  	}
}


</script>

<style>
#cancelContent {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
}
.cancelContentBody {
	padding: 1rem 5rem;
}
.cancelContentBody table {
	width: 100%;
	/*margin-bottom: 1.6rem;*/
	/*padding: 0.5rem 0.5rem;*/
	border-spacing: 0;
	border-collapse: separate;
	background: white;
}
.cancelContentBody button {
	width:  5.6rem;
}
</style>
