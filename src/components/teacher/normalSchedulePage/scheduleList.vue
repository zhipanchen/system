<template>
	<div id="scheduleList">
		<div class="classList">
			<table>
				<thead>
					<tr>
						<td width="">上课日期</td>
						<td width="">周数</td>
						<td width="">星期</td>
						<td width="">上课时段</td>
						<td width="">课堂名称</td>
						<td width="">开课部门</td>
						<td width="">排课状态</td>
						<td width="">状态</td>
						<td width="">确认</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in tableList">
						<td v-text="data.time"></td>
						<td v-text="data.numWeeks"></td>
						<td v-text="data.week"></td>
						<td v-text="data.classTime"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.department"></td>
						<td v-text="data.scheduleState"></td>
						<td v-text="data.state" id="state" class="textRed"></td>
						<td class="textBtn"><a id="affirmState" @click="affirmBtn">{{data.affirm}}</a></td>
						<!-- <td><button v-on:click="affirmBtn">{{data.affirm}}</button></td> -->
					</tr>
				</tbody>
			</table>
			<button class="am-btn am-btn-success am-radius" v-on:click="returnBtn">返回</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'scheduleList',
	data () {
		return {
			tableList: [
				{time: '2016-09-06', numWeeks: '1', week: '二', classTime: '第1-4节', courseName: '青羊校区二教学楼302', department: '医护分院', scheduleState: '正常排课', state: '未确认', affirm: '确认'},
				{}
			]
		}
	},
	methods: {
		affirmBtn: function () {
			var redState = document.getElementById("state")
			var affirmState = document.getElementById("affirmState")
			var r = confirm("您确定信息无误并提交？")
			if (r==true) {
				alert("已提交！");
				redState.innerHTML = "已确认"
				redState.style.color = "black"
				affirmState.removeAttribute("style")
			}
			else {
				alert("提交失败。")
			}
		},
		returnBtn: function () {
			window.location.href = "/teacher/classList"
		}
	}
}
</script>

<style>
#scheduleList {
	width: 100%;
	margin-top: 1rem;
	background-color: #ececec;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.classList {
	padding: 3rem 5rem;
}
.classList table {
	background-color: #dddddd;
	width: 100%;
}
.classList thead tr td,
.classList tbody tr td {
	font-size: 0.8rem;
	/*font-weight: bold;*/
}
.classList button {
	margin-top: 1.5rem;
	width: 6rem;
	font-size: 0.9rem;
}
.textRed {
	color: red;
}
</style>