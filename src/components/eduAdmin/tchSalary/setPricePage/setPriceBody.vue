<template>
<div>
	<div class="blank">
		<div class="semester">当前学年学期：{{currentSemester}}</div>
	</div>

	<div id="setPriceBody">
		<div class="setPriceContent">
			<table class="operationTable">
				<thead>
					<tr>
						<th width="25%">ID</th>
						<th width="25%">职称</th>
						<th width="25%">课酬/课时</th>
						<th width="25%">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(setSalary, index) in jobtitleStrList" :id="'inputTr'+index" :key="setSalary">
						<td>
							<input id="input1" type="text" :value="setSalary.jobtitleId" readonly="true">
						</td>
						<td>
							<input id="input2" type="text" :value="setSalary.jobName" readonly="true">
						</td>
						<td>
							<input id="input3" type="text" :value="setSalary.payPerCourse" readonly="true">
						</td>
						<td class="operations" :value="setSalary.opts">
							<img :id="'editImg'+index" width="25px" height="25px" class="editImg" src="../../../public/images/edit.png" @click="editClick(index)">
			                <img :id="'saveImg'+index" width="25px" height="25px" class="saveImg" src="../../../public/images/save.png" @click="saveClick(index)">
			                <img :id="'restoreImg'+index" width="25px" height="25px" class="restoreImg" src="../../../public/images/restore.png" @click="restoreClick(index)">
			                <img :id="'deleteImg'+index" width="25px" height="25px" class="deleteImg" src="../../../public/images/delete.png" @click="deleteClick(index)">
						</td>
					</tr>
					<tr>
						<td>
							<img src="../../../public/images/add.png" width="25px" height="25px" id="addLine" @click="addClick()">
						</td>
						<td></td>
						<td></td>
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
			currentSemester: '',
			jobtitleStrList: [
				{}
			],
			newTableList: [
				{ jobtitleId: '', jobName: '', payPerCourse: '', opts: '' }
			]
		}
	},
	beforeMount: function() {
        this.$http.post('./jobTitleManage/getJobtitleInfo',{
        },{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.currentSemester = data.currentSemester;
            this.jobtitleStrList = data.jobtitleStrList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 编辑功能
		editClick: function(index){
            var inputTr = document.getElementById("inputTr"+index);
            var input = inputTr.getElementsByTagName("input");
            var editImg = document.getElementById("editImg"+index);
            var saveImg = document.getElementById("saveImg"+index);
            var restoreImg = document.getElementById("restoreImg"+index);
            var deleteImg = document.getElementById("deleteImg"+index);
            var i = null;
			// 使课程信息的输入标签变为可输入，显示边框
            if (input[0].value == "请编辑后保存") {
            	for(i = 0;i<input.length;i++){
                	input[i].readOnly = false;
                	input[i].style.border = "0.1rem solid #d4d4d9";
                	input[i].value = "";
            	}
            }else{
            	for(i = 1;i<input.length;i++){
	                input[i].readOnly = false;
	                input[i].style.border = "0.1rem solid #d4d4d9";
	            }
            }
            
			// 隐藏编辑和删除功能图标,显示保存和重置功能图标
            editImg.style.display = "none";
            saveImg.style.display = "inline";
            deleteImg.style.display = "none";
            restoreImg.style.display = "inline";
        },
        // 取消修改,重置数据,退出编辑
        restoreClick: function(index){
            if(confirm("您确定取消编辑并重置该薪酬信息吗？")){
              var inputTr = document.getElementById("inputTr"+index);
              var input = inputTr.getElementsByTagName("input");
              var editImg = document.getElementById("editImg"+index);
              var saveImg = document.getElementById("saveImg"+index);
              var restoreImg = document.getElementById("restoreImg"+index);
              var deleteImg = document.getElementById("deleteImg"+index);
              var i = null;
				// 重置数据到value,虽然input的value和data中的属性绑定,但并不是完全的双向,此时data中的属性数据并没有发生修改
                // input[0].value = this.jobtitleStrList[index].jobtitleId;
                input[1].value = this.jobtitleStrList[index].jobName;
                input[2].value = this.jobtitleStrList[index].payPerCourse;
				// 使课程信息的输入标签变为不可输入，隐藏边框
              for(i = 1;i<input.length;i++){
                input[i].readOnly = true;
                input[i].style.border = "none";
              }
              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg.style.display = "none";
            }
        },
        deleteClick: function(index){
			// 从data中的课程信息数组中删除
			// 预留功能,将data提交到后端,实现删除数据,处理回调
            if(confirm("您确定删除该薪酬吗？")){
              	// console.log(jobtitleId);
				this.$http.post('./jobTitleManage/deleteJobtitle',{
				    "jobtitleId": this.jobtitleStrList[index].jobtitleId
				},{
				    "Content-Type":"application/json"
				}).then(function(response){
				    console.log("通过申请:");
				    console.log(response);
				    var data = response.body;
				    if(data.result == "1") {
				        this.jobtitleStrList.splice(index, 1);
				    }else if (data.result == "0") {
				        alert("操作失败！请重试");
				    }
				},function(error){
				    console.log("通过申请error:");
				    console.log(error);
				});
            }
        },
        // 保存功能
		saveClick: function(index){
			if(confirm("您确定提交保存该薪酬吗？")){
			  var inputTr = document.getElementById("inputTr"+index);
			  var input = inputTr.getElementsByTagName("input");
			  var editImg = document.getElementById("editImg"+index);
			  var saveImg = document.getElementById("saveImg"+index);
			  var restoreImg = document.getElementById("restoreImg"+index);
			  var deleteImg = document.getElementById("deleteImg"+index);
			  var i = null;
			// 保存数据到data,虽然input的value和data中的属性绑定,但并不是完成的双向,此时data中的属性数据并没有发生修改
			    this.jobtitleStrList[index].jobtitleId = input[0].value;
			    this.jobtitleStrList[index].jobName = input[1].value;
			    this.jobtitleStrList[index].payPerCourse = input[2].value;
			    // console.log(this.jobtitleStrList);
			    // for (i=0;i<input.length;i++) {
			    // 	if (input[i].value) {}
			    // }
			  for(i = 0;i<input.length;i++){
			    input[i].readOnly = true;
			    input[i].style.border = "none";
			  }
			// 预留功能,将data提交到后端,实现保存数据,处理回调
			  editImg.style.display = "inline";
			  saveImg.style.display = "none";
			  deleteImg.style.display = "inline";
			  restoreImg.style.display = "none";
			// 向后台提交数据
			    // console.log(jobtitleId);
				this.$http.post('./jobTitleManage/editJobtitle',{
				    "jobtitleId": this.jobtitleStrList[index].jobtitleId,
				    "jobName": this.jobtitleStrList[index].jobName,
				    "payPerCourse": this.jobtitleStrList[index].payPerCourse
				},{
				    "Content-Type":"application/json"
				}).then(function(response){
					console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
			        this.jobtitleStrList = data.jobtitleStrList;
				},
				function(error){
				    console.log("通过申请error:");
				    console.log(error);
				});
			}
		},
		// addClick: function (index) {
		// 	// this.jobtitleStrList.splice(1,index,"");
		// 	this.jobtitleStrList.push(this.newTableList);
		// 	this.newTableList = { jobtitleId: '', jobName: '', payPerCourse: '', opts: '' };
		// 	var inputTr = document.getElementById("inputTr"+index);
		// 	var input = inputTr.getElementsByTagName("input");
		// 	var editImg = document.getElementById("editImg"+index);
		// 	var saveImg = document.getElementById("saveImg"+index);
		// 	var restoreImg = document.getElementById("restoreImg"+index);
		// 	var deleteImg = document.getElementById("deleteImg"+index);
		// 	for(i = 0;i<input.length;i++){
		// 	    input[i].readOnly = false;
		// 	    input[i].style.border = "0.1rem solid #d4d4d9";
		// 	  }
		// 	  editImg.style.display = "none";
		// 	  saveImg.style.display = "inline";
		// 	  deleteImg.style.display = "none";
		// 	  restoreImg.style.display = "inline";
		// },
		addClick: function (){
			this.jobtitleStrList.push(
              	{ jobtitleId:"请编辑后保存", jobName:"请编辑后保存", payPerCourse:"请编辑后保存" }
            );
            // this.$http.post('./jobTitleManage/addJobtitle',{},{
            // 	"Content-Type":"application/json"
            // }).then(function(response){
            // 	console.log("获取申请:");
            // 	console.log(response.body);
            // 	var data = response.body;
            // },
            // function(error){
            // 	console.log("通过申请error:");
            // 	console.log(error);
            // })；
        }
	}
}

</script>

<style>
#setPriceBody {
	width: 100%;
	background-color: #ececec;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.setPriceContent {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
	padding-bottom: 1.3rem;
}
.setPriceContent img {
	cursor: pointer;
	width: 1.8rem;
	height: 1.8rem;
}
/*.setPriceContent table {
	width: 100%;
}
.setPriceContent > thead > tr > th,
.setPriceContent > tbody > tr > th,
.setPriceContent > thead > tr > td,
.setPriceContent > tbody > tr > td {
	padding: 0.4rem 0rem;
	line-height: 1.6;
	vertical-align: bottom;
}
.setPriceContent th {
	font-size: 0.9rem;
	font-weight: bold;
	background-color: white;
	height: 2rem;
}
.setPriceContent td {
	font-size: 0.5rem;
	height: 2rem;
}
.setPriceContent > table > thead > tr > th, 
.setPriceContent > table > tbody > tr > td {
	border-bottom: 2px solid #ddd;
}*/

.setPriceContent input {
    text-align: center;
    border: 0;
}
.operations img {
	padding: 0 1rem;
}
.saveImg, 
.restoreImg {
	display: none;
}
</style>