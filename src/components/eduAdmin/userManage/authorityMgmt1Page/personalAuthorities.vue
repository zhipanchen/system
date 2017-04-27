<template>
	<div id="authorities">
		<div class="changed">
			当前选择：李华
		</div>
		<div class="changedTable">
			<table>
				<tbody>
					<tr v-for="(authority, index) in authorityList" :key="authority">
						<td>
							<Checkbox v-model="single"></Checkbox>
						</td>
						<td v-model="authority.label">{{authority.label}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="changedBtn">
			<button class="am-btn am-btn-success am-radius" @click="saveBtn">保存</button>
			<button class="am-btn am-btn-success am-radius" @click="submitBtn">提交</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'authorities',
	data () {
		return {
			authorityList: [
				{label: '教师', value: 'jiaoshi'},
				{label: '督导', value: 'dudao'},
				{label: '自定义角色1', value: 'zidingyi'}
			]
		}
	},
	beforeMount: function () {
		this.$http.post('../eduAuthorityMgmt1.php').then(function (response) {
			console.log(response);
			this.authorityList = response.body.authorityList;
		});
	},
	methods: {
		saveBtn: function () {

		},
		submitBtn: function () {

		}
	}
}
</script>

<style>
@import '../../../../assets/css/external.css';

#authorities {
	width: 40rem;
	height: 30em;
	border: 1px solid black;
	padding: 1rem 1rem;
}
.changed {
	padding: 0.6rem;
	line-height: 1.6;
	border-bottom: 2px solid #ddd;
}
.changedTable {
	height: 20rem;
}
.changedTable td {
	padding-right: 1rem;
}
.changedBtn {
	display: flex;
 	justify-content: center;
}
.changedBtn button {
	margin:  0 0.7rem;
	width: 5.6rem;
}

@media screen and (max-width:1023px){
  html{
    font-size: 56%;
  }
}
</style>