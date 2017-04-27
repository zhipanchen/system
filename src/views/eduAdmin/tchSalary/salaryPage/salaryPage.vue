<template>
	<div id="salary">
		<top-title></top-title>
    <top-bar1></top-bar1>
    
    <salary-body></salary-body>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar1 from '../../../../components/eduAdmin/tchSalary/salaryPage/topBar1'
import salaryBody from '../../../../components/eduAdmin/tchSalary/salaryPage/salaryBody'

export default {
	name: 'salary',
	components: {
    	topTitle, topBar1, salaryBody
  },
  methods: {
   
  }
}
</script>

<style>
#salary input {
  /*margin: 0.6rem 0;*/
  margin-right: 1.4rem;
}
.buttonPart {
  float: right;
}

</style>
