<template>
<div>
	<div class="tableSelect">
		<input v-model="courseNum" placeholder="课程编号">
		<input v-model="courseName" placeholder="课程名称">
	    <select v-model="teacherNumber">
			<option disabled>教师编号</option>
			<option v-for="option1 in options1" :value="option1.value" @click="tchNumClick(option1.value)">
				{{ option1.text }}
			</option>
	    </select>
	    <select v-model="teacher">
	    	<option disabled>上传教师</option>
			<option v-for="option2 in options2" :value="option2.value" @click="tchClick(option2.value)">
				{{ option2.text }}
			</option>
	    </select>
		<button class="am-btn am-btn-success am-radius" @click="checkTableBtn()">查询</button>
	    <button class="am-btn am-btn-success am-radius" @click="modal = true">提交</button>
	    <Modal v-model="modal" id="modalBody" :styles="{top:'10rem'}">
			<p style="text-align:center; font-size:1.1rem;">您确定要提交查看所有信息吗？</p>
			<div slot="footer" style="text-align:center;">
				<Button id="modalBtn" @click="ok()">确定</Button>
				<Button id="modalBtn" @click="cancel()">取消</Button>
			</div>
		</Modal>
	</div>
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
						<td v-text="data.teacherName"></td>
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
</div>
</template>

<script>
export default {
	data () {
		return {
			courseNum: '',
			courseName: '',
			teacherNumber: '教师编号',
			teacher: '上传教师',
			// select选项
			options1: [
				// {text: '123456', value:'1'}
			],
			options2: [
				// {text: '上传教师'}
			],
			scoreUnloadList: [
				{classNum: '010203', className: '护理学', teacherNum: '010203', teacherName: '何平', time: '06.01.23 12:55', check: '未查看'}
				// {classNum: '010203', className: '基础护理学', teacherNum: '010203', teacherName: '何平', time: '06.01.23 12:55', check: '未查看'}
			],
			modal: false,		// 提交弹出框
		}
	},
	beforeMount: function () {
		this.$http.post('../eduAdminCancelGrade.php',{
            "Content-Type":"eduAdminCancelGrade/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.scoreUnloadList = data.scoreUnloadList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
	},
  	methods: {
  		tchNumClick: function (value) {
  			this.$http.post('../eduAdminCancelGrade.php', {
  				"courseNum": courseNum,
  				"courseName": courseName,
  				"value1": option1.value,
  				"value2": option2.value
  			}, {
  				"Content-Type":"eduAdminCancelGrade/json"
  			}).then(function(response){
  				console.log("通过申请:");
                console.log(response);
                var data = response.body;
                if(data.result == "1") {
                    this.scoreUnloadList = data.scoreUnloadList;
                }else{
                    alert("操作失败！请重试");
                }
  			});
  		},
  		tchClick: function () {

  		},
  		// 点击查询，回调表单
  		checkTableBtn: function () {

  		},
  		// 点击提交，列表所有数据已查看***********************
  		ok () {
            setTimeout(() => {
                this.modal = false;
                this.$Message.success('提交成功！所有成绩信息已查看。');
            }, 100);
            for (var i = 0; i < this.scoreUnloadList.length; i++) {
            	this.scoreUnloadList[i].check = "已通过";
            }
        },
        cancel () {
            setTimeout(() => {
                this.modal = false;
                this.$Message.error('提交失败！请重新操作。');
            }, 100);
        },
  		// 查看该条信息，修改状态为“已查看”***************
  		checkClick: function (index) {
			var r = confirm("是否同意？")
			if (r==true) {
				alert("已通过！");
				this.scoreUnloadList[index].check="已通过"
			}
  		},
  		// 撤销该条信息，在列表中清除********************
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
