<template>
<div>
	<div class="tableSelect">
        <select v-model="selGradeType">
			<option disabled>选择年制</option>
			<option v-for="gradeTypeOne in gradeType" :value="gradeTypeOne">{{gradeTypeOne}}年制</option>
		</select>
		<select v-model="selExecSemster">
			<option disabled>选择学期</option>
			<option v-for="execSemsterOne in execSemster" :value="execSemsterOne">{{execSemsterOne}}</option>
		</select>
		<select v-model="selCourseName">
			<option disabled>选择课程</option>
			<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>
		</select>
		<select v-model="selClassId">
			<option disabled>选择班级</option>
			<option v-for="classIdOne in classInfo" :value="classIdOne.classId">{{classIdOne.className}}</option>
		</select>
        <button class="am-btn am-btn-success am-radius" v-on:click="findBtn()">查询</button>
        <button class="am-btn am-btn-success am-radius" v-on:click="exportBtn()">导出</button>
            <!-- <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" id="uploadBtn">上传文件</Button>
            </Upload> -->
      </div>

	<div id="makeupList">
		<div class="makeupListBody">
			<div class="needMakeupList">
				<span>*以下是需要补考的名单</span>
				<div class="list1">
					<table class="normalTable">
						<thead>
							<tr>
								<td>年制</td>
								<td>年级</td>
								<td>专业</td>
								<td>学号</td>
								<td>学生姓名</td>
								<td>课程名称</td>
								<td>正考成绩</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="data in makeUpList">
								<td v-text="data.gradeType"></td>
								<td v-text="data.term"></td>
								<td v-text="data.specialityName"></td>
								<td v-text="data.studentId"></td>
								<td v-text="data.studentName"></td>
								<td v-text="data.courseName"></td>
								<td v-text="data.grade"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="doubleFailList">
				<span>*以下是补考不通过需要申请的同学</span>
				<div class="list2">
					<table class="operationTable">
						<thead>
							<tr>
								<!-- <td>
									<input id="checkAll" type="checkbox" @click="checkAll()">
								</td> -->
								<td width="23%">申请学生</td>
								<td width="23%">申请课程</td>
								<td width="25%">申请时间</td>
								<td width="21%">操作</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(data, index) in makeUpAskList" :key="data">
								<!-- <td>
									<input type="checkbox" :id="data.checkOne" :value="data.value" :checked="data.checked" v-model="single">
								</td> -->
								<td v-text="data.student"></td>
								<td v-text="data.course"></td>
								<td v-text="data.time"></td>
								<td>
									<img class="rightImg" width="25px" height="25px" @click="rightBtn(index)">
									<img class="wrongImg" width="25px" height="25px" @click="wrongBtn(index)">
									<!-- <ul> -->
										<!-- <span class="rightImg" width="25px" height="25px" @click="rightBtn(index)"></span>
										<span class="wrongImg" width="25px" height="25px" @click="wrongBtn(index)"></span> -->
									<!-- </ul> -->
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
            <button class="am-btn am-btn-success am-radius" @click="modal1 = true">同意申请</button>
            <Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
				<p style="text-align:center; font-size:1.1rem;">您确定要提交查看所有信息吗？</p>
				<div slot="footer" style="text-align:center;">
					<Button id="modalBtn" @click="ok1()">确定</Button>
					<Button id="modalBtn" @click="cancel1()">取消</Button>
				</div>
			</Modal>
            <button class="am-btn am-btn-success am-radius" @click="modal2 = true">取消申请</button>
            <Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
				<p style="text-align:center; font-size:1.1rem;">您确定要提交查看所有信息吗？</p>
				<div slot="footer" style="text-align:center;">
					<Button id="modalBtn" @click="ok2()">确定</Button>
					<Button id="modalBtn" @click="cancel2()">取消</Button>
				</div>
			</Modal>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'makeupList',
	data () {
		return {
			selGradeType: '选择年制',
			selExecSemster: '选择学期',
			selCourseName: '选择课程',
			selClassId: '选择班级',
			gradeType: ["三","五"],
			execSemster: [],
			courseInfo: [],
			classInfo: [],
			makeUpList: [		// 获取补考名单
				// {},{},{},{}
			],
			makeUpAskList: [
				{student: '李华', course: '护理学', time: '2017-04-10'},
				{student: '李华', course: '护理学', time: '2017-04-10'},
				{student: '李华', course: '护理学', time: '2017-04-10'}
			],
			modal1: false,		// 同意所有申请弹出框
			modal2: false,		// 不同意所有申请弹出框
		}
	},
	beforeMount: function() {
        this.$http.post('./findMakeUpList',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.gradeType = data.gradeType;
            this.execSemster = data.execSemster;
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
            this.classInfo = data.classInfo;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
  	methods: {
  		// 查找名单
  		findBtn: function () {
        	// 获取需要补考名单*************************************************
  			this.$http.post('./findMakeUpList',{
	        	"gradeType": this.selGradeType,
	        	"execSemster": this.selExecSemster,
	        	"courseId": this.selCourseName,
	        	"classId": this.selClassId
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
        	// 获取补考申请同意名单*********************************************
        	this.$http.post('./makeUpAsk',{
	        	"gradeType": this.selGradeType,
	        	"execSemster": this.selExecSemster,
	        	"courseId": this.selCourseName,
	        	"classId": this.selClassId
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
	            	this.makeUpAskList = data.makeUpAskList;
	            }else{
			        alert("操作失败！请重试");
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
	    },
	    // 下载按钮********************************************************************
	    exportBtn: function () {

	    },
	    // 单个批准补考申请********************************************************
  		rightBtn: function (index) {
  			var r = confirm("您确定提交数据？");
  			if (r==true) {
  				this.$http.post('./makeUpAskAgree',{
  					"student": this.makeUpAskList[index].student,
  					"course": this.makeUpAskList[index].course
  				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.result == "1") {
		            	alert("补考申请批准！");
  						this.makeUpAskList.splice(index, 1);
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
  			}
  		},
	    // 单个不同意补考申请**********************************************************
  		wrongBtn: function (index) {
  			var w = confirm("您确定删除数据？");
  			if (w==true) {
  				this.$http.post('./makeUpAskDisagree',{
  					"student": this.makeUpAskList[index].student,
  					"course": this.makeUpAskList[index].course
  				},{    
		            "Content-Type":"application/json"
		        }).then(function(response){
		            console.log("获取申请:");
		            console.log(response.body);
		            var data = response.body;
		            if (data.result == "1") {
		            	alert("未通过申请！");
  						this.makeUpAskList.splice(index, 1);
		            }else{
				        alert("操作失败！请重试");
				    }
		        },function(error){
		            console.log("获取申请error:");
		            console.log(error);
	        	});
  			}
  		},
  		// 点击提交，所选名单同意申请，并删除**************************************************
  		// submit: function () {
  		// 	this.$http.post('./makeUpAskAgree',{
  		// 		"makeUpAskList": this.makeUpAskList
  		// 	},{    
	   //          "Content-Type":"application/json"
	   //      }).then(function(response){
	   //          console.log("获取申请:");
	   //          console.log(response.body);
	   //          var data = response.body;
	   //          if (data.result == "1") {
	   //          	this.makeUpAskList = [];
	   //          }else{
			 //        alert("操作失败！请重试");
			 //    }
	   //      },function(error){
	   //          console.log("获取申请error:");
	   //          console.log(error);
    //     	});
  		// },
  		ok1 () {
            setTimeout(() => {
                this.modal1 = false;
                this.$Message.success('所有学生补考申请成功！');
            }, 100);
            this.$http.post('./makeUpAskAgree',{
  				"makeUpAskList": this.makeUpAskList
  			},{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
	            	this.makeUpAskList = [];
	            }else{
			        alert("操作失败！请重试");
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
        },
        cancel1 () {
            setTimeout(() => {
                this.modal1 = false;
            }, 100);
        },
  		// 点击取消，所选名单不同意申请，并删除*****************************************************
  		// cancel: function () {
  		// 	this.$http.post('./makeUpAskDisagree',{
  		// 		"makeUpAskList": this.makeUpAskList
  		// 	},{    
	   //          "Content-Type":"application/json"
	   //      }).then(function(response){
	   //          console.log("获取申请:");
	   //          console.log(response.body);
	   //          var data = response.body;
	   //          if (data.result == "1") {
	   //          	this.makeUpAskList = [];
	   //          }else{
			 //        alert("操作失败！请重试");
			 //    }
	   //      },function(error){
	   //          console.log("获取申请error:");
	   //          console.log(error);
    //     	});
  		// },
  		ok2 () {
            setTimeout(() => {
                this.modal2 = false;
                this.$Message.success('撤销所有学生补考申请！');
            }, 100);
            this.$http.post('./makeUpAskDisagree',{
  				"makeUpAskList": this.makeUpAskList
  			},{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
	            	this.makeUpAskList = [];
	            }else{
			        alert("操作失败！请重试");
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
        },
        cancel2 () {
            setTimeout(() => {
                this.modal2 = false;
            }, 100);
        }
  	}
}
</script>

<style>
/*#selectDiv {
	display: flex;
	text-align: center;
	justify-content: center;
}*/

#makeupList {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
	position: relative;
	display: inline-block;
	overflow: hidden;
}
.makeupListBody {
	margin: 1rem 5rem;
	padding: 1.4rem 0;
	background-color: white;
}
.makeupListBody button {
	width: 5.6rem;
	margin: 0 0.7rem;
}
.needMakeupList span,
.doubleFailList span {
	float: left;
	padding-left: 2rem;
}

#required {
	background: url(../../../../components/public/images/star.png) 2% 50% no-repeat;
}

.list1, .list2 {
	padding: 2rem;
}
.list2 {
	padding-bottom: 0.8rem;
}
.doubleFailList table {
	border: 2px solid #ececec;
	width: 100%;
}

ul {
	list-style: none;
	text-align: center;
	margin: 0;
	width: 100%;
}
li {
	float: left;
	margin: 0 5%;
	cursor: pointer;
}
.rightImg {
	margin: 0 5%;
	border: 0;
	vertical-align: text-bottom;
	background: url(./images/right.png) 50% 50% no-repeat;
	cursor: pointer;
}
.wrongImg {
	margin: 0 5%;
	vertical-align: text-bottom;
	background: url(./images/wrong.png) 50% no-repeat;
	cursor: pointer;
}
.rightImg:hover {
	background: url(./images/right-on.png) 50% no-repeat;
}
.wrongImg:hover {
	background: url(./images/wrong-on.png) 50% no-repeat;
}



</style>
