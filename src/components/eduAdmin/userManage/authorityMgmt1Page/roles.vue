<template>
	<div id="roles">
		<table class="operationTable">
			<thead>
				<tr>
					<th>
						<!-- <input type="checkbox" v-model="checkAll" v-check-all="checkAll" check-data="checkData"> -->
					</th>
					<th>
					    <select v-model="model1" style="width:8rem;">
					    	<option v-for="item in roleList" :value="item.value" :key="item">
					    		{{ item.label }}
					    	</option>
					    </select>
					</th>
					<th>
						<input v-model="value" placeholder="输入姓名或编码" style="width:6rem;">
					</th>
				</tr>
			</thead>
			<!-- 选择基本角色后，从后台返回角色列表 -->
			<tbody>
				<tr v-for="person in checkData">
					<td>
						<Checkbox v-model="person.checked"></Checkbox>
						<!-- <input type="checkbox" v-model="person.checked" style="cursor:pointer;width:1rem;height:1rem;"> -->
					</td>
					<td v-model="person.name">{{person.name}}</td>
					<td v-model="person.number">{{person.number}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'roles',
	'check-all': {
        twoWay: true,
        params: ['checkData'],
        bind() {
            // 如果所有的列表的checked属性都为true,则选中全选框,否则不选中全选框
            this.vm.$watch(this.params.checkData, (checkData) => {
                if (checkData.every((person) => person.checked)) {
                    this.set(true);
                } else {
                    this.set(false);
                }
            }, { deep: true });
        },
        // checkAll发生更改时
        update(checkAll) {
            // 如果全选框被选中,则将列表的所有checked属性转为true,否则转为false
            if (checkAll) {
                this.vm[this.params.checkData].forEach((person) => {
                    person.checked = true;
                });
            } else {
                this.vm[this.params.checkData].forEach((person) => {
                    person.checked = false;
                });
            }
        },
    },
	data () {
		return {
			all: false,
			single: false,
			// 选择角色
			model1: '0',
			roleList: [
				{ label: '基础角色选择', value: '0' },
				{ label: '学生', value: '1' },
				{ label: '教师', value: '2' },
				{ label: '管理员', value: '3' }
			],
			// 角色下的人
			checkData: [
				{name: '李华', number: '20142201'},
				{name: '李华', number: '20142201'},
				{name: '李华', number: '20142201'}
			]
		}
	},
	beforeMount: function () {
		this.$http.post('../eduAuthorityMgmt1.php').then(function (response) {
			console.log(response);
			this.checkData = response.body.checkData;
		});
	},
	methods: {

	}
}
</script>

<style>
#roles {
	width: 20rem;
	height: 30em;
	border: 1px solid black;
	padding: 1rem 1rem;
}
#model {
	width: 3rem;
}

.roleTable {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  border: none;
}
.roleTable > thead > tr > th,
.roleTable > tbody > tr > th,
.roleTable > thead > tr > td,
.roleTable > tbody > tr > td {
  padding: 0.4rem 0rem;
  line-height: 1.6;
}
.roleTable th {
  font-size: 0.9rem;
  font-weight: bold;
  background-color: white;
  height: 2rem;
}
.roleTable td {
  font-size: 0.5rem;
  height: 2rem;
  text-align: center;
}
.roleTable > thead > tr > th {
  border-bottom: 2px solid #ddd;
}
.roleTable select {
	text-align: center;
	width: 80%;
	height: 1.8rem;
	font-size: 0.8rem;
	outline: none;
	cursor: pointer;
}
.roleTable input {
	/*cursor: pointer;*/
}

</style>