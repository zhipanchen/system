<template>
	<div id="salary">
		<top-title></top-title>
    <top-bar1></top-bar1>
    
    <schedule-list-body></schedule-list-body>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar1 from '../../../../components/eduAdmin/tchSalary/scheduleListPage/topBar1'
import scheduleListBody from '../../../../components/eduAdmin/tchSalary/scheduleListPage/scheduleListBody'

export default {
	name: 'salary',
	components: {
    	topTitle, topBar1, scheduleListBody
  },
  methods: {
   
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
